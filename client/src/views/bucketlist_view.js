const PubSub = require('../helpers/pub_sub.js');

const BucketListView = function(list){
  this.list = list;
};

BucketListView.prototype.bindEvents = function(){
  PubSub.subscribe('BucketList:data-loaded', (event) => {
    this.render(event.detail);
  })
};

BucketListView.prototype.render = function(listItems){
  this.list.innerHTML = '';
  listItems.forEach((listItem) => {
  const listItemElement = document.createElement('li');
  listItemElement.textContent = `${listItem.title}, ${listItem.description}, ${listItem.byAge}`;
  this.list.appendChild(listItemElement);
  });
}

module.exports = BucketListView;