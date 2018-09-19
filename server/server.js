const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

const public = path.join(__dirname, '../client/public');
app.use(express.static(public));

app.use(parser.json());

MongoClient.connect('mongodb://localhost:27017').then((client) => {
  const db = client.db('bucket_listdb');
  const bucketListCollection = db.collection('bucket_list');
  const bucketListRouter = createRouter(bucketListCollection);
  app.use('/api/bucketlist', bucketListRouter);
}).catch(console.error);

app.listen(3000, function (){
  console.log(`Litening on port ${ this.address().port}`);
});