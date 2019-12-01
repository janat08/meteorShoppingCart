import './productForm.html';
import {Products} from '/imports/api/cols.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

// import form from 'meteor/'
Template.productForm.onCreated(function () {
    const name = FlowRouter.getParam("productName")
    if (name){
     this.autorun(() => {
        SubsCache.subscribe('products.one', name)
     });
    }
});

Template.productForm.helpers({
    product(){
        const res = Products.findOne({slug: {$eq: FlowRouter.getParam("productName")}})
        console.log(123, res)
        return res
    }
});

Template.productForm.events({
  'submit .product-add'(event) {
    event.preventDefault();

    const {title: {value: tV}, description: {value: dV}, price: {value: pV}} = event.target;
    console.log(tV)
    // Meteor.call('links.insert', title.value, url.value, (error) => {
    //   if (error) {
    //     alert(error.error);
    //   } else {
    //     title.value = '';
    //     url.value = '';
    //   }
    // });
  },
});
