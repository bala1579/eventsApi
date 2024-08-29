import express from "express";

// This will help us connect to the database
// import db from "../db/connection.js";
import db from "./connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId, Timestamp } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("events");
  let results = await collection.find({}).toArray();
  // res.status(200).json({  results });
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/events/:_id", async (req, res) => {
  let collection = await db.collection("events");
  let query = { _id: new ObjectId(req.params._id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  // res.send(result).status(200);
  else res.status(200).json({ result });
});

// This section will help you create a new record.
router.post("/events", async (req, res) => {
  //   try {
  //     let newDocument = {
  //       name: req.body.name,
  //       position: req.body.position,
  //       level: req.body.level,
  //    } };
  try {
    let newDocument = {
      name: req.body.name,
      // files[image]: req.body.image,
      tagline: req.body.tagline,
      schedule: req.body.schedule,
      description: req.body.description,
      moderator: req.body.moderator,
      category: req.body.category,
      sub_category: req.body.sub_category,
      rigor_rank: req.body.rigor_rank,
    };
    // res.status(200).json({ newDocument });
    let collection = await db.collection("events");
    let result = await collection.insertOne(newDocument);
    res.status(200).json({ message: "sucess", result, newDocument }); // this line for see the json file on thunder cient
    // res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by id.
router.patch("/events/:_id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params._id) };
    const updates = {
      $set: {
        name: req.body.name,
        // files[image]: req.body.image,
        tagline: req.body.tagline,
        schedule: req.body.schedule,
        description: req.body.description,
        moderator: req.body.moderator,
        category: req.body.category,
        sub_category: req.body.sub_category,
        rigor_rank: req.body.rigor_rank,
      },
    };

    let collection = await db.collection("events");
    let result = await collection.updateOne(query, updates);
    res.status(200).json({ message: "success", result, updates });
    // res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating events");
  }
});

// This section will help you delete a record
router.delete("/events/:_id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params._id) };

    const collection = db.collection("events");
    let result = await collection.deleteOne(query);
    res.status(200).json({ message: "deleted succesfully", result });

    // res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting events");
  }
});

export default router;
