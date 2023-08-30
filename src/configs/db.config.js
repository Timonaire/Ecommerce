const {
    MongoClient,
    ServerApiVersion
} = require('mongodb');
const uri = "mongodb+srv://<Timonaire>:<TIMO1234>@ecommerce.upsojxz.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        // Confirm a successful connection
        await client.db("admin").command({
            message: 1
        });
        console.log("You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
