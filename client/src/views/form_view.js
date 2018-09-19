const PubSub = require('../helpers/pub_sub.js');

const FormView = function(form){
  this.form = form;
};

FormView.prototype.bindEvents = function(){
  this.form.addEventListener('submit', (event) => {
    this.handleSubmit(event);
  })
};

FormView.prototype.handleSubmit = function(event){
  event.preventDefault();
  const newBucketListItem = this.createEntry(event.target);
  console.log(event.target);
  PubSub.publish('FormView:submitted-input', newBucketListItem);
  event.target.reset();
}

FormView.prototype.createEntry = function(form){
  const newEntry = {
    title: form['new-item-title'].value,
    description: form['new-item-description'].value,
    byAge: form['new-item-byage'].value
  }
  return newEntry;
};

module.exports = FormView;