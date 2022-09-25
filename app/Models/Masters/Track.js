require('dotenv').config();
import {Schema, model, ObjectId} from 'mongoose';
import mongoosastic from 'mongoosastic';

const trackSchema = new Schema({
    track_name: {
        type: String,
    },
    track_image: {
        type: String,
    },
    track_download_url: {
        type: String,
    },
    album_name: {
        type: String,
    },
    track_released_date: {
        type: String,
    },
    music_director: {
        type: String,
    },
    artists: {
        type: Array,
    },
    lyrics_writer: {
        type: String,
    },
    lyrics: {
        type: Array,
    },
    album_language: {
        type: Array,
    },
    downloads: {
        type: String,
    },
    likes: {
        type: String,
    },
    dislikes: {
        type: String,
    },
    track_duration: {
        type: String,
    },
    track_size : {
        type : String
    },
    genre : {
        type : Array
    },
    status : {
        type : Boolean
    },
    albumId : {
        type : ObjectId,
        ref : "album"
    }
    },{
    timestamps: true
}
);

export default model('track', trackSchema);
