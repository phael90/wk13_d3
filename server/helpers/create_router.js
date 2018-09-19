const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  // all the routes for reading and writing to the database (we only did show all and create!)
  const router = express.Router();

  // INDEX
  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.log(err)
        res.status(500);
        res.json({ status: 500, error: err })
      })
  });

  // SHOW
  // get request with id route goes here

  // CREATE
  router.post('/', (req, res) => {
    const newData = req.body;
    collection 
      .insertOne(newData)
      .then(() => {
        collection
          .find()
          .toArray()
          .then((docs) => {
            res.json(docs)
          })
      })
  });


  // UPDATE
  // put request with new data route goes here

  // DELETE
  // delete request with id route goes here

  return router;
};

module.exports = createRouter;