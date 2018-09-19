const FormView = require('./views/form_view.js');
const BucketList = require('./models/bucket_list.js');
const BucketListView = require('./views/bucketlist_view.js')

document.addEventListener('DOMContentLoaded', () => {
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
