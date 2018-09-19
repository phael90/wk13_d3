const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

// telling express where the public folder is
const public = path.join(__dirname, '../client/public');
app.use(express.static(public));

// making sure app uses is parsed into json
app.use(parser.json());

// connecting to the database
MongoClient.connect('mongodb://localhost:27017').then((client) => {
  const db = client.db('bucket_listdb');

  // specifying which collection (document version of a table) to read to and write from
  const bucketListCollection = db.collection('bucket_list');
  const bucketListRouter = createRouter(bucketListCollection);
  // go through all routes in createRouter and replace them with /api/bucketlist for bucketListCollection
  app.use('/api/bucketlist', bucketListRouter);
}).catch(console.error);

// listen on localhost:3000
app.listen(3000, function (){
  console.log(`Litening on port ${ this.address().port}`);
});