const express = require("express");
const router = express.Router();
const knowledgeModel = require("./schema").knowledgeModel;
const userModel = require("./schema").UserModel;

require("./auth")(router, userModel);

const passport = require("passport");

const SIGNINURL = "http://localhost:3000/";

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/check-auth",
    failureRedirect: SIGNINURL,
  })
);

router.post("/register", (req, res) => {
  userModel.findOne({ username: req.body.username }, async (err, username) => {
    if (err) {
      res.status(500).send("something wrong happened");
    } else if (username) {
      res.status(500).send("the user already exist");
    } else {
      const data = new userModel({
        username: req.body.username,
        password: req.body.password,
      });

      try {
        await data.save();
        res.status(200).send("registration successful");
      } catch (err) {
        console.log(err);
        res.status(500).send("something wrong happened");
      }
    }
  });
});

// =============== CRUD =================
router.post("/content", async (req, res) => {
  const data = new knowledgeModel({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
  });

  try {
    const newData = await data.save(); // un declared variable
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
});

router.get("/content", async (req, res) => {
  const allKnowledge = await knowledgeModel.find();

  try {
    res.send(allKnowledge);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/content/:id", async (req, res) => {
  try {
    const updatedKnowledge = await knowledgeModel.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, body: req.body.body }
    );
    await updatedKnowledge.save();
    res.status(200).json(updatedKnowledge);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/content/:id", async (req, res) => {
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
