import './cartProduct.html';
// import { Carts, Products } from '/imports/api/cols.js';

Template.cartProduct.events({
  'click .jsRemove'(event, instance) {
    this.product.productId
    //call method to remove
  },
  'click .jsChange'(event, instance){
      //change count field
  }
});
