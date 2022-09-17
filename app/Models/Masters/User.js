require('dotenv').config();
import {Schema, model, ObjectId} from 'mongoose';
import mongoosastic from 'mongoosastic';

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    gender : {
        type : String
    },
    dob : {
        type : String
    },
    mobile_number : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password: {
        type: String
    },
    status : {
        type : Boolean,
        default: true
    },
},{
    timestamps: true
}
);

export default model('User', userSchema);
