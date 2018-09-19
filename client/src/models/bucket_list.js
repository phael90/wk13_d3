const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const BucketList = function() {
  this.url = 'http://localhost:3000/api/bucketlist';
  this.request = new Request(this.url);
};

BucketList.prototype.bindEvents = function(){
  PubSub.subscribe('FormView:submitted-input', (event) => {
      this.postForm(event.detail);
      console.log(event.target);
  })
};

BucketList.prototype.getData = function(){
  this.request.get()
    .then((listItems) => {
      PubSub.publish('BucketList:data-loaded', listItems);
    })
    .catch(console.error);
}

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