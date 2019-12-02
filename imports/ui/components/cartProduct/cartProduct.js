import './cartProduct.html';
// import { Carts, Products } from '/imports/api/cols.js';

Template.cartProduct.events({
  'click .jsRemove'(event, instance) {
    Meteor.call('carts.remove', instance.data.product.productId)
  },
  'click .jsIncrement'(event, instance){
      Meteor.call('carts.upsert', instance.data.product.productId)
  },
    'click .jsDecrement'(event, instance){
            Meteor.call('carts.decrement', instance.data.product.productId)

  }
});
