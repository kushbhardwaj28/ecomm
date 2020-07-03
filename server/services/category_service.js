
export function createCategory(createDto, type, connection, callback) {
    const createCategodySql = "INSERT INTO category(" +
        "Name" +
        ", Type" +
        ") values(" +
        `"${createDto.name}"` +
        `, "${type}"` +
        ")";

    connection.query(createCategodySql, (err, result) => {
        if (err) {
            console.log(err);
            callback(undefined, err);
            return false;
        }
        callback(result.insertId, undefined)
    });
}