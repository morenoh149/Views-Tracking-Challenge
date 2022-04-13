import * as functions from "firebase-functions";
import {db} from "./index";

/* BONUS OPPORTUNITY
It's not great (it's bad) to throw all of this code in one file.
Can you help us organize this code better?
*/


export interface Recording {
    id: string; // matches document id in firestore
    creatorId: string; // id of the user that created this recording
    uniqueViewCount: number;
}

export interface User {
  id: string; // matches both the user's document id
  uniqueRecordingViewCount: number; // sum of all recording views
}

export interface UserRecording {
  viewerId: string; // matches both the user's document id
  recordingId: number; // sum of all recording views
}

export enum Collections {
    Users = "Users",
    Recordings = "Recordings",
    UserRecordings = "UserRecordings"
}

export async function trackRecordingView(viewerId: string, recordingId: string): Promise<void> {
  // logs can be viewed in the firebase emulator ui
  functions.logger.debug("viewerId: ", viewerId);
  functions.logger.debug("recordingId: ", recordingId);

  // TODO: implement this function
  await db.collection("UserRecordings").doc(`${viewerId}_${recordingId}`).set({viewerId, recordingId});
  const user = await db.collection("Users").doc(viewerId).get();
  const recording = await db.collection("Recordings").doc(recordingId).get();
  if (user.exists) {
    const userData = user.data()!;
    functions.logger.debug("user exists", userData);
    await db.collection("Users").doc(viewerId).set({
      id: userData.id,
      uniqueRecordingViewCount: userData.uniqueRecordingViewCount+1
    });
  }
  if (recording.exists) {
    const recordingData = recording.data()!;
    functions.logger.debug("recording exists", recordingData);
    await db.collection("Recordings").doc(recordingId).set({
      id: recordingData.id,
      creatorId: recordingData.creatorId,
      uniqueViewCount: recordingData.uniqueViewCount+1
    });
  }
 
  // ATTN: the rest of the code in this file is only here to show how firebase works
  // read from a document
  const documentSnapshot = await db.collection("collection").doc("doc").get();
  if (documentSnapshot.exists) {
    const data = documentSnapshot.data();
    functions.logger.debug("it did exist!", data);
  } else {
    functions.logger.debug("it didn't exist");
  }

  // write to a document using set or update
  // set overwrites existing data and creates new documents if necessary
  await db.collection("collection").doc("doc").set({id: "id", field: "foo"});
  // update will fail if the document exists and will only update fields included
  // in your update
  await db.collection("collection").doc("doc").set({id: "id", field: "bar"});

  // read more about transactions, batch writes etc here:
  // https://firebase.google.com/docs/firestore/manage-data/transactions#web-version-9
}
