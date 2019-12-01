import './productForm.html';
import {Products} from '/imports/api/cols.js';
// import form from 'meteor/'
console.log(Products)
Template.productForm.onCreated(function () {

});

Template.productForm.helpers({

});

Template.productForm.events({
  'submit .info-link-add'(event) {
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
