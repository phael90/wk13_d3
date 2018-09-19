const FormView = require('./views/form_view.js');
const BucketList = require('./models/bucket_list.js');
const BucketListView = require('./views/bucketlist_view.js')

// the entry point into the app
document.addEventListener('DOMContentLoaded', () => {

    // instantiate the objects and call the bindEvents() method on them
    // so that all the event listeners are listening and the pubsubs are publishing or subscribing
    const form = document.querySelector('#form');
    const formView = new FormView(form);
    formView.bindEvents();

    const bucketList = new BucketList();
    bucketList.bindEvents();
    bucketList.getData();

    const list = document.querySelector('#list');
    const bucketListView = new BucketListView(list);
    bucketListView.bindEvents();
});
