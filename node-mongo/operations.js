// this a file node module where we will define our basic db operations

const assert = require('assert');
// function to insert document, contains 4 paramters , in which collection to insert document and call back which
// will recieve the result.
exports.insertDocument =(db,document,collection,callback) =>{
    const coll = db.collection(collection);
   return  coll.insert(document );

};

// function to fetch all documents

exports.findDocuments =(db,collection,callback) => {
    const coll = db.collection(collection);
    coll.find( {}).toArray();
};

// function to update the content in document takes 5 params , in which collection of db , which attribute of
// document to modify.

exports.updateDocument = (db,document,update,collection,callback) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update }, null);
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};