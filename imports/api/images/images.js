// Definition of the links collection

import { Mongo } from 'meteor/mongo';
import { FilesCollection } from 'meteor/ostrio:files';
import Products from '../products/products.js'

export const Images = new FilesCollection({collectionName: 'Images'});
console.log(123, typeof Products)

// Images.collection.addLinks({
//     'products': {
//         collection: Products,
//         inversedBy: 'images'
//     }
// })