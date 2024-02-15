const express = require('express');
const { route } = require('./mobile');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./backend/data_base.db');

/*router.put('/:code_identification', (req, res) => {
    const code_identification = req.params.code_identification;
    const { etat, temperature } = req.body;
    db.run('UPDATE maison SET etat = ?, temperature = ?,  WHERE codeIdentification = ?', [etat, temperature, code_identification], function(err) {
        if (err) {
            console.error('Erreur lors de la mise à jour de la piece :', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            console.log('piece mis à jour avec succès');
            res.sendStatus(200);
        }
    });
});*/


module.exports = function (io, socketsMap){
    router.put('/room/:code_identification', (req, res) => {
        const code_identification = req.params.code_identification;
        const { etat, temperature } = req.body;
        db.run('UPDATE pieces_maison SET etat = ?, temperature = ? WHERE code_identification = ?', [etat, temperature, code_identification], function(err) {
            if (err) {
                console.error('Erreur lors de la mise à jour de la piece :', err);
                socketsMap.forEach(socket => {
                    socket.emit('update', { message: code_identification, success: true });
                    console.log ('update send');
                });
                res.status(500).json({ error: 'Erreur serveur' });
            } else {
                console.log('piece mis à jour avec succès');
                res.sendStatus(200);
            }
        });
    });

    return router;
};