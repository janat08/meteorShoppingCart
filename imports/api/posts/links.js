import Posts from './collection.js';
import Users from '/imports/api/users/collection.js';

Posts.addLinks({
    owner: {
        type: 'one',
        collection: Users,
        field: 'ownerId',
        index: true
    },

});