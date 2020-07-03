//@ts-check

export function createSeller(name, email, connection, callback) {
    // console.log(createDto)
    const createCategodySql = "INSERT INTO seller(" +
        "Name" +
        ", Email" +
        // ", MobileNumber" +
        ") values(" +
        `"${name}"` +
        `, "${email}"` +
        // `, "${mobileNumber}"` +
        ")";

    connection.query(createCategodySql, (err, result) => {
        if (err) {
            console.log(err);
            callback(undefined, err);
            return false;
        }
        connection.query(
            "SELECT * FROM seller where Id=" + result.insertId, (err, result) => {
                if (err) {
                    console.log(err);
                    callback(undefined, err);
                    return false;
                }
                callback(result);
            }
        );
    });
}

export function updateUser(updateDto, connection, callback) {
    const updateStoreQuery = "UPDATE user set " +
        (updateDto.displayName ? `Name = "${updateDto.displayName}"` : '') +
        (updateDto.email ? `, Email = "${updateDto.email}"` : '') +
        (updateDto.mobileNumber ? `, MobileNumber = "${updateDto.mobileNumber}"` : '') +
        `where Id = ${updateDto.id}`;

    connection.query(updateStoreQuery, (err, result) => {
        if (err) {
            console.log(err);
            callback(undefined, err);
        }
        connection.query(
            "SELECT * from user where Id=" + updateDto.id, (err, result) => {
                if (err) {
                    console.log(err);
                    callback(undefined, err);
                }
                callback(result);
            });
    });
}

export function getAllUsers(connection, callback) {
    connection.query(
        "SELECT * from user", (err, result) => {
            if (err) {
                callback(undefined, err);
            }
            callback(result);
        });
}

export function getUser(email, connection, callback) {
    connection.query(
        `SELECT * from seller where Email="${email}"`, (err, result) => {
            if (err) {
                callback(undefined, err);
            }
            callback(result);
        });
}

export function getUserById(id, connection, callback) {
    connection.query(
        `SELECT * from seller where Id="${id}"`, (err, result) => {
            if (err) {
                callback(undefined, err);
            }
            callback(result);
        });
}

export function sellerFindOrCreate(profile, connection, done) {
    getUser(profile.emails[0].value, connection, (result, err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        if (result.length > 0) {
            return done(null, result[0]);
        } else {
            return createSeller(
                profile.name.givenName + ' ' + profile.name.familyName,
                profile.emails[0].value, connection,
                (result, err) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    return done(null, result[0]);
                });
        }
    });
}
