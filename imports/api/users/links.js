import Users from './collection.js';
import Posts from '/imports/api/posts/collection.js';

Users.addLinks({
    posts: {
        inversedBy: 'owner',
        collection: Posts
    },
});
