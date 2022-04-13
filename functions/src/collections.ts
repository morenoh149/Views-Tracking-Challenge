
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