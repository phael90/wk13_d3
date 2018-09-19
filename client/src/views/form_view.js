const PubSub = require('../helpers/pub_sub.js');

const FormView = function(form){
  // the client side form that gets filled in (hardcorded in the index.html)
  this.form = form;
};

// listen for the user to click the submit button and pass the submitted data to handleSubmit method
FormView.prototype.bindEvents = function(){
  this.form.addEventListener('submit', (event) => {
    this.handleSubmit(event);
  })
};

// filter the data that was passed down to capture only the target
// call the createEntry method and pass in the target
// publish the new entry on channel FormView:submitted-input
FormView.prototype.handleSubmit = function(event){
  event.preventDefault();
  const newBucketListItem = this.createEntry(event.target);
  console.log(event.target);
  PubSub.publish('FormView:submitted-input', newBucketListItem);
  event.target.reset();
}

// capture the values from each input field in the form and return them
FormView.prototype.createEntry = function(form){
  const newEntry = {
    title: form['new-item-title'].value,
    description: form['new-item-description'].value,
    byAge: form['new-item-byage'].value
  }
  return newEntry;
};

module.exports = FormView;