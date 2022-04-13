import * as functions from "firebase-functions";
import {db} from "./index";

/* BONUS OPPORTUNITY
It's not great (it's bad) to throw all of this code in one file.
Can you help us organize this code better?
*/

export async function trackRecordingView(viewerId: string, recordingId: string): Promise<void> {
  // logs can be viewed in the firebase emulator ui
  functions.logger.debug("viewerId: ", viewerId);
  functions.logger.debug("recordingId: ", recordingId);

  // https://firebase.google.com/docs/firestore/manage-data/transactions#web-version-9
  const userRecording = await db.collection("UserRecordings").doc(`${viewerId}_${recordingId}`).get();
  const user = await db.collection("Users").doc(viewerId).get();
  const recording = await db.collection("Recordings").doc(recordingId).get();
  if (!userRecording.exists) {
    if (user.exists && recording.exists) {
      await db.collection("UserRecordings").doc(`${viewerId}_${recordingId}`).set({viewerId, recordingId});
      const userData = user.data()!;
      functions.logger.debug("user exists", userData);
      await db.collection("Users").doc(viewerId).set({
        id: userData.id,
        uniqueRecordingViewCount: userData.uniqueRecordingViewCount+1
      });
      const recordingData = recording.data()!;
      functions.logger.debug("recording exists", recordingData);
      await db.collection("Recordings").doc(recordingId).set({
        id: recordingData.id,
        creatorId: recordingData.creatorId,
        uniqueViewCount: recordingData.uniqueViewCount+1
      });
    }
  }
}
