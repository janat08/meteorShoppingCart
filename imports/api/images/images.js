// Definition of the links collection

import { Mongo } from 'meteor/mongo';
import { FilesCollection } from 'meteor/ostrio:files';

export const Images = new FilesCollection({collectionName: 'Images'});
