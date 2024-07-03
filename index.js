const express = require('express');
require('dotenv').config();
const urlRoutes = require('./routes/url.route.js');
const { connectToMongoDB } = require("./db.js");
const url = require('./model/url.model.js');

const PORT = process.env.PORT;

const app = express();
app.use(express.json());


connectToMongoDB().then(() => {
    console.log("DB Connected!!");
});

// app.use("/*")
app.use("/", urlRoutes);

app.listen(PORT, () => {
    console.log(`Server Started At PORT ${PORT}`);
})

