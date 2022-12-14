require('dotenv').config();
import {Schema, model, ObjectId} from 'mongoose';
import mongoosastic from 'mongoosastic';

const albumSchema = new Schema({
        album_name: {
            type: String,
            required: true
        },
        album_image: {
            type: String,
        },
        album_released_year: {
            type: String,
        },
        album_director: {
            type: String,
        },
        album_genre: {
            type: Array,
        },
        album_cast: {
            type: Array,
        },
        language: {
            type: Array,
        },
        album_released_country: {
            type: String,
        },
        tracks: [{
            type: ObjectId,
            ref : "track"
        }],
        imdb_rating: {
            type: String,
        },
        likes: {
            type: String,
        },
        dislikes: {
            type: String,
        },
        music_director: {
            type: String,
        },
        downloads : {
            type : String
        },
        total_songs : {
            type : String
        },
        status : {
            type : Boolean
        }
    },{
        timestamps: true
    }
);

export default model('album', albumSchema);
