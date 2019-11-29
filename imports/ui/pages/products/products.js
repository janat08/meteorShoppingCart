import './products.html';
import { Products } from '/imports/api/products/products.js';

Template.products.onCreated(function productsOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.products.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.products.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
