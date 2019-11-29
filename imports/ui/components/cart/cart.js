import './cart.html';
import { Carts } from '/imports/api/carts/carts.js';

Template.cart.onCreated(function cartOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.cart.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.cart.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
