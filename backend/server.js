const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//const utilisateursRoutes = require('./routes/utilisateurs');
const arduinoRoutes = require('./routes/arduino');
const mobileRoutes = require('./routes/mobile');

//app.use('/utilisateurs', utilisateursRoutes);
app.use('/arduino', arduinoRoutes);
app.use('/mobile', mobileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
