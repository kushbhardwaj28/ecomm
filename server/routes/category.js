//@ts-check

import connection from '../connection/db_connection.js';
import express from 'express';

var router = express.Router();

router.post('/getAll', function (req, res, next) {
  connection.query(
    "SELECT * from category", (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }
      res.send(result);
    });
});

export default router;
