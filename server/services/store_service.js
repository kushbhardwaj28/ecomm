//@ts-check

import { createCategory } from './category_service.js';
import { createStoreHelper, updateStoreHelper } from '../utils/store_util.js';

export function createStore(createDto, user, connection, callback) {
    if (createDto.category) {
        createCategory(createDto.category, 'store', connection, (result, err) => {
            if (err) {
                console.log(err);
                callback(undefined, err);
            }
            createStoreHelper(createDto, user, connection, result, callback);
        });
    } else {
        createStoreHelper(createDto, user, connection, createDto.categoryId, callback);
    }
}

export function updateStore(updateDto, connection, callback) {
    if (updateDto.category) {
        createCategory(updateDto.category, 'store', connection, (result, err) => {
            if (err) {
                console.log(err);
                callback(undefined, err);
            }
            updateStoreHelper(updateDto, connection, result, callback);
        });
    } else {
        updateStoreHelper(updateDto, connection, updateDto.categoryId, callback);
    }
}

export function getAllStores(user, connection, callback) {
    console.log(user);
    connection.query(
        "SELECT store.* FROM store " +
        "LEFT JOIN store_seller_mapping ON " +
        "store.Id = store_seller_mapping.StoreId " +
        "where store_seller_mapping.SellerId=" + user.Id,
        (err, result) => {
            if (err) {
                console.log(err);
                callback(undefined, err);
            }
            callback(result);
        }
    );
}
