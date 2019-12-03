import './orders.html';
import { Orders } from '/imports/api/cols.js';
import '../../components/cartProduct/cartProduct.js'
Template.orders.onCreated(function cartOnCreated() {
  // counter starts at 0
  this.autorun(()=>{
    SubsCache.subscribe('orders.all')
  })
  // this.autorun()
});

Template.orders.helpers({
  orders() {
    return Orders.find()
  },
});

Template.orders.events({
  'click .jsPay'(event, instance) {
    Meteor.call('orders.insert')
  },
});
