// this a file node module where we will define our basic db operations

const assert = require('assert');
// function to insert document, contains 4 paramters , in which collection to insert document and call back which
// will recieve the result.
exports.insertDocument =(db,document,collection,callback) =>{
    const coll = db.collection(collection);
    coll.insert(document ,(err,result) => {
        assert.equal(err,null);
        console.log("Inserted " + result.result.n +
            " documents into the collection " + collection);
        callback(result);
    });

};

// function to fetch all documents

exports.findDocuments =(db,collection,callback) => {
    const coll = db.collection(collection);
    coll.find( {},(err,docs) => {
        assert.equal(err,null);
        callback(docs);
    } );
};

// function to update the content in document takes 5 params , in which collection of db , which attribute of
// document to modify.

exports.updateDocument = (db,document,update,collection,callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document ,{ $set: update }, null, (err, result)=>{
        assert.equal(err, null);
        console.log("Updated the document with ", update);
        callback(result); 
    }) ;
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.equal(err, null);
        console.log("Removed the document ", document);
        callback(result);        
    });
};