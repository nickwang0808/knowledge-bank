const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

mongoose.set("useFindAndModify", false);

const connectionStatus = () =>
  console.log("connection State: ", mongoose.connection.readyState);

mongoose.connection.on("connected", () => connectionStatus());
mongoose.connection.on("disconnected", () => connectionStatus());

const knowledgeSchema = new Schema({
  title: { type: String, required: true },
  body: String,
  author: String,
  date: { type: String, default: Date.now },
});

const knowledgeModel = mongoose.model("knowledge", knowledgeSchema);

router.post("/create", async (req, res) => {
  const data = new knowledgeModel({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
  });

  try {
    newData = await data.save();
    console.log(newData);
    console.log("update sucess");
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
});

router.get("/get", async (req, res) => {
  const allKnowledge = await knowledgeModel.find();

  try {
    res.send(allKnowledge);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const updatedKnowledge = await knowledgeModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    await updatedKnowledge.save();
    res.status(200).send(updatedKnowledge);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  knowledgeModel.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      if (!doc) {
        res.status(404).send("Doc does not exist");
      } else {
        res.status(200).send(doc);
      }
    }
  });
});

module.exports = router;
