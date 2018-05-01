const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOperation = require ('./operations');

const url = 'mongodb://localhost:27017/confusion';

MongoClient.connect(url, (err, db) => {

    assert.equal(err,null);

    console.log('Connected correctly to server');

   /* const collection = db.collection("dishes");
    collection.insertOne({"name": "Uthappizza", "description": "test"},
    (err, result) => {
        assert.equal(err,null);

        console.log("After Insert:\n");
        console.log(result.ops);

        collection.find({}).toArray((err, docs) => {
            assert.equal(err,null);
            
            console.log("Found:\n");
            console.log(docs);

            db.dropCollection("dishes", (err, result) => {
                assert.equal(err,null);

                db.close();
            });
        });
    });*/

    dbOperation.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes", (result) => {
            console.log("Insert Document:\n", result.ops);

            dbOperation.findDocuments(db, "dishes", (docs) => {
                console.log("Found Documents:\n", docs);

                dbOperation.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes",
                    (result) => {
                        console.log("Updated Document:\n", result.result);

                        dbOperation.findDocuments(db, "dishes", (docs) => {
                            console.log("Found Updated Documents:\n", docs);
                            
                            db.dropCollection("dishes", (result) => {
                                console.log("Dropped Collection: ", result);

                                db.close();
                            });
                        });
                    });
            });
    });

});