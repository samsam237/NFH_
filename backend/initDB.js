const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data_base.db');
const fs = require('fs');

function initDB() {
    db.serialize(() => {
        const initScript = fs.readFileSync('initDB.sql', 'utf8');
        db.exec(initScript, (err) => {
            if (err) {
                console.error('Erreur lors de l\'initialisation de la base de données :', err);
            } else {
                console.log('Base de données initialisée avec succès');
            }
        });
    });
}

initDB();
