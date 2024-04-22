var express = require("express");
const Log = require("../model/Log");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "FM Logger" });
});

// create a log
router.post("/create", async (req, res) => {
  try {
    const { jobId } = req.query;
    if (!jobId) {
      return res
        .send({
          message: "jobId parameter is required.",
        })
        .status(401);
    }

    const log = {
      name: `${jobId}.log`,
      logs: [],
    };

    await Log.create(log);

    res
      .send({
        message: "Log created.",
      })
      .status(201);
  } catch (e) {
    console.error(e);
    return res.send(e).status(500);
  }
});

// add a line to a specific log
router.patch("/log", async (req, res) => {
  try {
    const { jobId } = req.query;
    if (!jobId) {
      return res
        .send({
          message: "jobId parameter is required.",
        })
        .status(400);
    }

    const { log } = req.body;

    if (!log)
      return res
        .send({
          message: "Empty log.",
        })
        .status(400);

    const name = `${jobId}.log`;

    const updatedLog = await Log.findOneAndUpdate(
      { name },
      {
        $push: { logs: log },
      },
      { new: true }
    );

    if (!updatedLog) {
      return res.status(404).json({ message: "Log not found." });
    }

    return res.status(200).json({ message: "Log updated successfully." });
  } catch (e) {
    console.log(e);
    return res.send(e).status(500);
  }
});

// fetch a log by log-id
router.get("/fetch", async (req, res) => {
  try {
    const { jobId } = req.query;
    if (!jobId) {
      return res
        .send({
          message: "jobId parameter is required.",
        })
        .status(400);
    }

    const name = `${jobId}.log`;

    const log = await Log.findOne({ name });
    console.log(log)
    if (!log)
      return res.status(404).send({
        message: "Log not found.",
      });

    return res.status(200).send(log);
  } catch (e) {
    console.error(e);
    return res.send(e).status(500);
  }
});

// delete log by id
router.delete("/forget", async (req, res) => {
  try {
    const { jobId } = req.query;
    if (!jobId) {
      return res
        .send({
          message: "jobId parameter is required.",
        })
        .status(400);
    }

    const name = `${jobId}.log`;

    const isDeleted = await Log.deleteOne({ name });
    if (isDeleted.deletedCount > 0)
      return res
        .send({
          message: `${name} has been deleted.`,
        })
        .status(201);
    else
      return res
        .send({
          message: `Delete failed.`,
        })
        .status(401);
  } catch (e) {
    console.log(e);
    return res.send(e).status(500);
  }
});

module.exports = router;
