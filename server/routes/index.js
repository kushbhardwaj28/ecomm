//@ts-check

import connection from '../connection/db_connection.js';
import express from 'express';
import {
  createStoreSql,
  createCategorySql,
  createLocationSql,
  createPermissionNameSql,
  createPermissionSql,
  createProductsSql,
  createStoreSellerMappingSql,
  createUsersSql,
  createSellerSql
} from '../db/store_schema.js';

var router = express.Router();

router.get('/', function (req, res, next) {
  connection.query(createPermissionNameSql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500);
    }
    connection.query(createLocationSql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500);
      }
      connection.query(createCategorySql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500);
        }
        connection.query(createStoreSql, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500);
          }
          connection.query(createSellerSql, (err, result) => {
            if (err) {
              console.log(err);
              res.status(500);
            }
            connection.query(createUsersSql, (err, result) => {
              if (err) {
                console.log(err);
                res.status(500);
              }
              connection.query(createStoreSellerMappingSql, (err, result) => {
                if (err) {
                  console.log(err);
                  res.status(500);
                }
                connection.query(createPermissionSql, (err, result) => {
                  if (err) {
                    console.log(err);
                    res.status(500);
                  }
                  connection.query(createProductsSql, (err, result) => {
                    if (err) {
                      console.log(err);
                      res.status(500);
                    }
                    res.send("done");
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

router.get('/google-login', (req, res, next) => {
  res.send({
    loginUrl: 'http://localhost:3000/login/google'
  });
});

router.get('/fb-login', (req, res, next) => {
  res.send({
    loginUrl: 'http://localhost:3000/login/facebook'
  });
});

export default router;
