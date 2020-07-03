export const createStoreSql = "CREATE TABLE IF NOT EXISTS store(" +
    "Id int NOT NULL AUTO_INCREMENT PRIMARY KEY," +
    "Name varchar(255) NOT NULL," +
    "Decription varchar(255)," +
    "UniqueName varchar(50) NOT NULL UNIQUE," +
    "CategoryId int, " +
    "FOREIGN KEY(CategoryId) REFERENCES category(Id)" +
    ")";

export const createPermissionSql = "CREATE TABLE IF NOT EXISTS permissions(" +
    "Id int NOT NULL AUTO_INCREMENT PRIMARY KEY," +
    "PermissionId int," +
    "StoreId int," +
    "SellerId int," +
    "FOREIGN KEY(PermissionId) REFERENCES permission_name(Id)," +
    "FOREIGN KEY(StoreId) REFERENCES store(Id)," +
    "FOREIGN KEY(SellerId) REFERENCES seller(Id)" +
    ")";

export const createPermissionNameSql = "CREATE TABLE IF NOT EXISTS permission_name(" +
    "Id int NOT NULL AUTO_INCREMENT PRIMARY KEY," +
    "Name varchar(100) NOT NULL" +
    ")";

export const createUsersSql = "CREATE TABLE IF NOT EXISTS user(" +
    "Id int NOT NULL AUTO_INCREMENT PRIMARY KEY," +
    "Name varchar(255) NOT NULL," +
    "Email varchar(255) NOT NULL UNIQUE," +
    "MobileNumber varchar(255)," +
    "LocationId int," +
    "FOREIGN KEY(LocationId) REFERENCES locations(Id)" +
    ")";

export const createSellerSql = "CREATE TABLE IF NOT EXISTS seller(" +
    "Id int NOT NULL AUTO_INCREMENT PRIMARY KEY," +
    "Name varchar(255) NOT NULL," +
    "Email varchar(255) NOT NULL UNIQUE," +
    "MobileNumber varchar(255)," +
    "LocationId int," +
    "FOREIGN KEY(LocationId) REFERENCES locations(Id)" +
    ")";

export const createLocationSql = "CREATE TABLE IF NOT EXISTS locations(" +
    "Id int NOT NULL AUTO_INCREMENT PRIMARY KEY," +
    "Name varchar(255)," +
    "Log float," +
    "Lat float" +
    ")";

export const createCategorySql = "CREATE TABLE IF NOT EXISTS category(" +
    "Id int NOT NULL AUTO_INCREMENT PRIMARY KEY," +
    "Type varchar(50) NOT NULL," + // can make this another table as category_types overkill but error proof
    "Name varchar(255) NOT NULL" +
    ")";

export const createProductsSql = "CREATE TABLE IF NOT EXISTS product(" +
    "Id int NOT NULL AUTO_INCREMENT PRIMARY KEY," +
    "Name varchar(255)," +
    "Description varchar(255)," +
    "Price float," +
    "Quantity int," +
    "CategoryId int," +
    "StoreId int," +
    "FOREIGN KEY(CategoryId) REFERENCES category(Id)," +
    "FOREIGN KEY(StoreId) REFERENCES store(Id)" +
    ")";

export const createStoreSellerMappingSql = "CREATE TABLE IF NOT EXISTS store_seller_mapping(" +
    "StoreId int," +
    "SellerId int," +
    "PRIMARY KEY(StoreId, SellerId)," +
    "FOREIGN KEY(StoreId) REFERENCES store(Id)," +
    "FOREIGN KEY(SellerId) REFERENCES seller(Id)" +
    ")";


export const selectAllStore = `SELECT * from store`;