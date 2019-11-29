import './productForm.html';
import { Products } from '/imports/api/products/products.js';

Template.productForm.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.productForm.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.productForm.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
