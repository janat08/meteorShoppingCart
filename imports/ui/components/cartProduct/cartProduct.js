import './cartProduct.html';


Template.cartProduct.events({
  'click .jsRemove'(event, instance) {
    console.log(instance.data)
    Meteor.call('carts.remove', instance.data.product._id)
  },
  'click .jsIncrement'(event, instance){
      Meteor.call('carts.upsert', instance.data.product.productId)
  },
    'click .jsDecrement'(event, instance){
            Meteor.call('carts.decrement', instance.data.product.productId)

  }
});
