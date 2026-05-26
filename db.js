import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = "exemploApp.sqlite";
const SQL_CREATE_ENTRIES = `
CREATE TABLE IF NOT EXISTS locations(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    latitude REAL,
    longitude REAL
);
` ;

let _db = null;

export default function openDB() {
    if ( ! _db) {
        _db = SQLite.openDatabaseSync(DATABASE_NAME);
        // primeira vez que iremos abrir a conexão,
        // tentaremos criar nossas tabelas
        _db.withTransactionSync (() => {
            _db.execSync(SQL_CREATE_ENTRIES);
        });
    }
    return _db;
}