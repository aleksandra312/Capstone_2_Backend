"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class Comment {
  static async create({ username, createDate, usState, comment, isRelocate }) {
    const result = await db.query(
      `INSERT INTO comments
             (username, create_date, us_state, comment, is_relocate)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING username, create_date AS "createDate", us_state AS "usState", comment, is_relocate AS "isRelocate"`,
      [username, createDate, usState, comment, isRelocate]
    );
    const entry = result.rows[0];

    return entry;
  }

  static async findAll(searchFilters = {}) {
    let query = `SELECT id,
                      username,
                      create_date AS "createDate",
                      us_state AS "usState",
                      comment,
                      is_relocate AS "isRelocate"
                  FROM comments`;

    let whereExpressions = [];
    let queryValues = [];

    const { usState, username } = searchFilters;

    if (usState) {
      queryValues.push(`${usState}`);
      whereExpressions.push(`us_state = $${queryValues.length}`);
    }

    if (username) {
      queryValues.push(`${username}`);
      whereExpressions.push(`username = $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    query += " ORDER BY create_date DESC LIMIT 5";

    const result = await db.query(query, queryValues);

    return result.rows;
  }

  static async findAllIsRelocate(searchFilters = {}) {
    let query = `SELECT 
                    EXTRACT(year FROM create_date) AS year,
                    us_state,
                    COUNT(NULLIF(is_relocate, false)) AS relocate_true,
                    COUNT(NULLIF(is_relocate, true)) AS relocate_false
                  FROM comments`;

    let whereExpressions = [];
    let queryValues = [];

    const { usState, username, fromDate, toDate } = searchFilters;

    if (usState) {
      queryValues.push(`%${usState}%`);
      whereExpressions.push(`us_state ILIKE $${queryValues.length}`);
    }

    if (username) {
      queryValues.push(`${username}`);
      whereExpressions.push(`username = $${queryValues.length}`);
    }

    if (fromDate) {
      queryValues.push(`${fromDate}`);
      whereExpressions.push(`create_date >= $${queryValues.length}`);
    }

    if (toDate) {
      queryValues.push(`${toDate}`);
      whereExpressions.push(`create_date <= $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    query += " GROUP BY year, us_state ORDER BY relocate_true DESC";

    const result = await db.query(query, queryValues);

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
}

module.exports = Comment;
