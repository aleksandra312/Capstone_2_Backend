"use strict";

/** Routes for comments. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const Comment = require("../models/comment");

const commentNewSchema = require("../schemas/commentNew.json");

const router = new express.Router();

/** POST / comment => {username, createDate, comment, isRelocate} */

router.post("/", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, commentNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const comment = await Comment.create(req.body);
    return res.status(201).json({ comment });
  } catch (err) {
    return next(err);
  }
});

/** GET / comment => {id, username, createDate, comment, isRelocate}
 * returns all comments.
 */

router.get("/", async function (req, res, next) {
  try {
    const comments = await Comment.findAll();
    return res.json({ comments });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /id  => { deleted: id }
 * deletes a comment by id.
 */

router.delete("/:id", async function (req, res, next) {
  try {
    await Comment.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

/** GET /trend => { trendy: true }
 * returns trend based on the isRelocate values.
 */

router.get("/trend", async function (req, res, next) {
  try {
    const relocate = await Comment.findAllIsRelocate();

    const arr = relocate.map((r) => r.isRelocate);
    const trueCount = arr.filter(Boolean).length;
    const falseCount = arr.length - trueCount;

    const trendy = trueCount >= falseCount ? true : false;

    return res.json({ trendy });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
