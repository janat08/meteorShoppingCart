import './products.html';
import { Products } from '/imports/api/products/products.js';
import { ReactiveDict } from 'meteor/reactive-dict';
Template.products.onCreated(function productsOnCreated() {
     this.state = new ReactiveDict({limit: 20})
     this.autorun(() => {
        SubsCache.subscribe('products.all', this.state.get('limit'))
     });
});

Template.products.helpers({
  products(){
    const state = Template.instance().state
    //next page preloaded
    return Products.find({}, {limit: state.get('limit')-10})
  },
  allLoaded(){
    const state = Template.instance().state
    const count = state.get('limit')-10
    //add 10 so that we let use load the last 10 items
    return Products.find({}, {limit: count+10}).count() < count
  },
  counter() {
    return Template.instance().counter.get();
  },
});

Template.products.events({
  'click .jsLoadmore'(event, instance) {
    // increment the counter when button is clicked
    const st = instance.state
    st.set('limit', st.get('limit')+10);
  },
});
