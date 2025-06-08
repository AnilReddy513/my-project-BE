

const { MongoClient, ObjectId } = require('mongodb');

async function removeDuplicates() {
  const uri = 'mongodb+srv://anil:anil513@cluster0.tblrygm.mongodb.net/moviedb?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db('your_db_name'); // ? replace with your actual DB name
    const collection = db.collection('movies'); // ? replace with your collection name

    const duplicates = await collection.aggregate([
      {
        $group: {
          _id: "$title",
          count: { $sum: 1 },
          ids: { $push: "$_id" }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ]).toArray();

    for (const doc of duplicates) {
      doc.ids.shift(); // keep one
      await collection.deleteMany({ _id: { $in: doc.ids } });
    }

    console.log("? Duplicate titles removed.");
  } catch (error) {
    console.error("? Error:", error);
  } finally {
    await client.close();
  }
}

removeDuplicates();
