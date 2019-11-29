import './product.html';
import { Products } from '/imports/api/products/products.js';

Template.product.onCreated(function productOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.product.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.product.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
