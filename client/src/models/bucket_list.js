const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const BucketList = function() {
  this.url = 'http://localhost:3000/api/bucketlist';
  this.request = new Request(this.url);
};

// subscribe to the FormView:submitted-input channel and take the entry that was published on it
// call the postForm method and pass in the new entry
BucketList.prototype.bindEvents = function(){
  PubSub.subscribe('FormView:submitted-input', (event) => {
      this.postForm(event.detail);
      console.log(event.target);
  })
};

// get all the data in the collection and publish it on BucketList:data-loaded
BucketList.prototype.getData = function(){
  this.request.get()
    .then((listItems) => {
      PubSub.publish('BucketList:data-loaded', listItems);
    })
    .catch(console.error);
}

// post the entry to the database
// publish that the data was posted on BucketList:data-loaded
BucketList.prototype.postForm = function(listItem) {
  //console.log(listItem);
  this.request.post(listItem)
    .then((listItems) => {
      //console.log(listItems);
      PubSub.publish('BucketList:data-loaded', listItems);
    })
    .catch(console.error);
};

module.exports = BucketList;