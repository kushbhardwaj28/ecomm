//@ts-check

import connection from '../connection/db_connection.js';
import express from 'express';
import { createStore, updateStore, getAllStores } from '../services/store_service.js';
import { getUserById } from '../services/user_service.js';

var router = express.Router();

router.post('/getAll', function (req, res, next) {
    getAllStores(req.user, connection, (result, err) => {
        if (err) {
            res.sendStatus(500);
        }
        res.send(result);
    });
});

router.post('/get', function (req, res, next) {

    connection.query(
        `SELECT * from store where store.UniqueName="${req.body.uniqueName}"`, (err, storeResult) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }

            let store = storeResult[0];
            connection.query("SELECT * FROM category where Id=" + store.CategoryId, (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                store['Category'] = result[0];
                connection.query("SELECT * FROM product where StoreId=" + store.Id, (err, productResult) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    }
                    store['Products'] = productResult;
                    connection.query("SELECT seller.* FROM seller " +
                        "LEFT JOIN store_seller_mapping ON " +
                        "seller.Id = store_seller_mapping.SellerId " +
                        "where store_seller_mapping.StoreId=" + store.Id, (err, result) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                            }
                            store['Users'] = result;
                            res.send(store);
                        });
                });
            });
        });
});

router.post('/create', (req, res, next) => {
    createStore(req.body, req.user, connection, (result, err) => {
        if (err) {
            res.sendStatus(500);
        }
        res.send(result);
    });
});

router.post('/update', (req, res, next) => {
    updateStore(req.body, connection, (result, err) => {
        if (err) {
            res.sendStatus(500);
        }
        res.send(result);
    });
});

router.post('/delete', (req, res, next) => {
    connection.query("DELETE from store where Id = " + req.body.id, (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        res.send({ deleted: true });
    });
});

export default router;
