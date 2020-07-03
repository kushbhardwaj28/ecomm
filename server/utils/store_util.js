//@ts-check

export function createStoreHelper(createDto, seller, connection, categoryId, callback) {

    const createStoreQuery = "INSERT INTO store(" +
        "Name" +
        (createDto.description ? ", Decription" : "") +
        ", UniqueName" +
        (categoryId ? ", CategoryId" : "") +
        ") values(" +
        `"${createDto.name}"` +
        (createDto.description ? `, "${createDto.description}"` : "") +
        `, "${createDto.uniqueName}"` +
        (categoryId ? `, "${categoryId}"` : "") +
        ")";

    connection.query(createStoreQuery, (err, createResult) => {
        if (err) {
            console.log(err);
            callback(undefined, err);
        }
        connection.query(
            "SELECT * from store where id=" + createResult.insertId, (err, result) => {
                if (err) {
                    console.log(err);
                    callback(undefined, err);
                }
                connection.query(
                    "INSERT INTO store_seller_mapping(" +
                    "StoreId, SellerId) values (" +
                    `${createResult.insertId}, ${seller.Id})`,
                    (err, result) => {
                        if (err) {
                            console.log(err);
                            callback(undefined, err);
                        }
                        callback(result);
                    }
                );
            });
    });
}

export function updateStoreHelper(updateDto, connection, categoryId, callback) {
    const updateStoreQuery = "UPDATE store set " +
        (updateDto.name ? `Name = "${updateDto.name}"` : '') +
        (updateDto.description ? `, Decription = "${updateDto.description}"` : '') +
        (updateDto.uniqueName ? `, UniqueName = "${updateDto.uniqueName}"` : '') +
        (categoryId ? `, CategoryId = ${categoryId} ` : '') +
        `where id = ${updateDto.id}`;

    connection.query(updateStoreQuery, (err, result) => {
        if (err) {
            console.log(err);
            callback(undefined, err);
        }
        connection.query(
            "SELECT * from store where id=" + updateDto.id, (err, result) => {
                if (err) {
                    console.log(err);
                    callback(undefined, err);
                }
                callback(result);
            });
    });
}