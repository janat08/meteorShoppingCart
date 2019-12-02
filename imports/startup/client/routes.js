import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/images/images.js'
import '../../ui/pages/cart/cart.js'
import '../../ui/pages/product/product.js'
import '../../ui/pages/productForm/productForm.js'
import '../../ui/pages/products/products.js'

window.SubsCache = new SubsCache(5, 10);
window.LCarts = new Mongo.Collection(null);

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/cart', {
  name: 'App.images',
  action() {
    BlazeLayout.render('App_body', { main: 'cart' });
  },
});

FlowRouter.route('/product/:productId', {
  name: 'App.images',
  action() {
    BlazeLayout.render('App_body', { main: 'product' });
  },
});
FlowRouter.route('/images/:productId', {
  name: 'App.images',
  action() {
    BlazeLayout.render('App_body', { main: 'images' });
  },
});

FlowRouter.route('/productForm', {
  name: 'App.images',
  action() {
    BlazeLayout.render('App_body', { main: 'productForm' });
  },
});
FlowRouter.route('/productForm/:productId', {
  name: 'App.images',
  action() {
    BlazeLayout.render('App_body', { main: 'productForm' });
  },
});
FlowRouter.route('/products', {
  name: 'App.images',
  action() {
    BlazeLayout.render('App_body', { main: 'products' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
