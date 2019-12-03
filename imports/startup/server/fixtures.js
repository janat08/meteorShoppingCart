// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { ImagesFiles, Products } from '../../api/cols.js'

ImagesFiles.remove({ "meta.productId": "abcd" }, () => {
    ImagesFiles.load('https://raw.githubusercontent.com/VeliovGroup/Meteor-Files/master/logo.png', {
        fileName: 'logo.png',
        meta: {
            productId: "abcd"
        }
    }, function(er, fileRef) {
        console.log(er, "cant load the mock product")
        if (!Products.findOne('abcd')) {
            Products.insert({
                price: 23,
                title: 'The abcd',
                description: 'mocked product',
                imageIds: [fileRef._id]
            })
        }
        else {
            Products.update({
                title: 'The abcd'
            }, {
                imageIds: [fileRef._id]
            })
        }
    });


})
