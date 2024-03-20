const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/MongoDBBudgetTracker');

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {});

module.exports = mongoose.connection;

