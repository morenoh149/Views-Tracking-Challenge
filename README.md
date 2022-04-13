# Views-Tracking-Challenge

### Running
- navigate to the functions directory and install dependencies with
```
cd functions && npm i
```
- initiate the emulator from the functions directory with
```
npm run serve
```
- test argument validation
```
curl -i -X POST http://localhost:5001/sirocodingchallenges/us-central1/recordingViews
```
- test the endpoint with curl
```
curl -i -X POST http://localhost:5001/sirocodingchallenges/us-central1/recordingViews \
 -H 'Content-Type: application/json' \
 -d '{"viewerId": "Jake", "recordingId": "recordingA"}'
```

### Prerequisites:
- Node, if you don't have it, you can install it from https://nodejs.org/en/download/

### Getting Started:
- install the firebase CLI with
```
npm install -g firebase-tools
```
- navigate to the functions directory and install dependencies with
```
cd functions && npm i
```

### Writing Your Code:
- The main place you'll want to write your code is in functions/src/track-recording-view.ts
- Here you'll find a function stub you can use with some examples of how to interact with the firestore database
- Implement the function trackRecordingView

### Writing Test Cases For Your Code:
- No need to write full unit tests for your code, but inside functions/test/test.txt, list the test cases you'd test if you were to write thorough unit testing, and the expected result in each case

### Running Your Code:
Firebase has some excellent tooling for locally emulating cloud functions, firestore database, and more in concert. We've set up a database with some dummy data for you to play around with, and a website you can use to easily hit your locally running cloud function. You can assume the client will make calls to this function whenever a users opens a recording in the app. The website below is just an easy way for you to test your cloud function. Here's how to use it
- initiate the emulator from the functions directory with
```
npm run serve
```
- once your emulator is running, you can can easily access the firestore database and your function logs through the firebase emulator ui at http://localhost:4000. You should see some dummy data in the database
- use https://sirocodingchallenges.web.app to easily make requests to your function running locally
- NOTE: we don't have hot reloading setup for this project yet, so you'll have to terminate the emulator and restart whenever you make code changes with 
```
npm run serve
```