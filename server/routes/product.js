//@ts-check

import express from 'express';
import connection from '../connection/db_connection.js';
var router = express.Router();

router.post('/create', function (req, res, next) {
    const createDto = req.body;

    const createProduct = "INSERT INTO product(Name, Description, Price, Quantity, StoreId)" +
        " values (" +
        `"${createDto.name}"` +
        (createDto.description ? `, "${createDto.name}"` : `, ""`) +
        (createDto.price ? `, ${createDto.price}` : `0`) +
        (createDto.quantity ? `, ${createDto.quantity}` : `0`) +
        `, ${createDto.storeId}` +
        ")";

    connection.query(createProduct, (err, createResult) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        connection.query("SELECT * from product where Id=" + createResult.insertId, (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }

            res.send(result[0]);
        });
    });

});

export default router;
