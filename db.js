const mongoose = require('mongoose');
const DBConnectionString = process.env.DBConnectionString;

async function connectToMongoDB(){
    return await mongoose.connect(DBConnectionString);
}

module.exports = {
    connectToMongoDB,
}