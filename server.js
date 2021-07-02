const express = require('express');

const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

//body parser
app.use(express.json()); // receive json object req
app.use(express.urlencoded({ extended: true })); // receive strings and arrays req

app.use(express.static("public")); // makes public folder to client

//routes
app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, () => console.log(`We are listening on this port: ${PORT}`));