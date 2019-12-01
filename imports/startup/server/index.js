// Import server startup through a single index entry point

import './fixtures.js';
import './register-api.js';
import {ImagesFiles} from '../../api/images/images.js'
import '../../api/links.js'

    ImagesFiles.load('https://raw.githubusercontent.com/VeliovGroup/Meteor-Files/master/logo.png', {
      fileName: 'logo.png'
    });