"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class Comment {
  static async create({ username, createDate, comment, isRelocate }) {
    const result = await db.query(
      `INSERT INTO comments
             (username, create_date, comment, is_relocate)
             VALUES ($1, $2, $3, $4)
             RETURNING username, create_date AS "createDate", comment, is_relocate AS "isRelocate"`,
      [username, createDate, comment, isRelocate]
    );
    const entry = result.rows[0];

    return entry;
  }

  static async findAll() {
    const result = await db.query(
      `SELECT id,
              username,
              create_date AS "createDate",
              comment,
              is_relocate AS "isRelocate"
      FROM comments
      ORDER BY create_date DESC
      LIMIT 5`
    );

    return result.rows;
  }

  static async remove(id) {
    const result = await db.query(
      `DELETE
           FROM comments
           WHERE id = $1
           RETURNING id`,
      [id]
    );
    const entry = result.rows[0];

    if (!entry) throw new NotFoundError(`Comment does not exist: ${id}`);
  }

  static async findAllIsRelocate() {
    const result = await db.query(
      `SELECT 
          is_relocate AS "isRelocate"
      FROM comments`
    );

    return result.rows;
  }
}

module.exports = Comment;
