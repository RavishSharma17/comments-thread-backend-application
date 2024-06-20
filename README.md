### Curl requests to test
To test various curl requests I have used insomnia. An export of insomnia curl requests which contains all the required requests is being provided for verification purposes under `comments-be-curls.json`.

* Make sure the application is running : `node server.js` -> Runs application at port 3000
* Make sure mongodb is running at `mongodb://localhost:27017`: `mongod -dbpath /path` -> Runs mongo
* Import the above json in insomnia.
* Validate requests by creating users first, then manipulating comments/replies