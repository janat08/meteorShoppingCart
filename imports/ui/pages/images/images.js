import './images.html';
import { Images } from '/imports/api/images/images.js';

Template.images.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
  Meteor.subscribe('images.all');
  this.files = []
});

Template.images.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  },
  imageFiles() {
    console.log(123, Images.findOne())
    return Images.find().fetch();
  },
});

Template.images.events({
  'change #fileInput'(e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      e.currentTarget.files.forEach((x,i)=>{
              // We upload only one file, in case
      // multiple files were selected
      const upload = Images.insert({
        file: e.currentTarget.files[i],
        streams: 'dynamic',
        chunkSize: 'dynamic',
        meta: {
          uploader: Meteor.userId(),
          productName: FlowRouter.getParam("productId")
        },
      }, false);
      console.log(upload)

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
          alert('File "' + fileObj.name + '" successfully uploaded');
        }
        template.currentUpload.set(false);
        template.push(fileObj)
      });

      upload.start();
      })
    }
  }
});