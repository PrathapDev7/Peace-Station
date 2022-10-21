require('dotenv').config();
import {Schema, model, ObjectId} from 'mongoose';

const musicDirectorsSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },{
        timestamps: true
    }
);

export default model('musicDirectors', musicDirectorsSchema);
