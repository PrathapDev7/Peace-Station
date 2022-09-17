import Mongoose from 'mongoose';
require('dotenv').config();
const dbURI = process.env.DB_URI

let isConnected;
let db;

const connectDB = async () => {
    if (isConnected) return db;

    try {
        db = await Mongoose.connect(dbURI, {
            // authSource: 'admin',
        });
        isConnected = db.connections[0].readyState;
        return db;
    } catch (err) {
        throw new Error(err);
    }
};

export default connectDB;
