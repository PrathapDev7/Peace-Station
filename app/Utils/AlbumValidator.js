import * as yup from "yup";

const createAlbumSchema = yup.object().shape({
   album_name: yup.string().min(1, 'album name must be more than 3 characters').max(100).required({ album_name: 'album_name is required' }),
});

const updateAlbumSchema = yup.object().shape({
    album_name: yup.string().min(1, 'album_name must be more than 3 characters').max(100).required({ album_name: 'album_name is required' }),
});

module.exports = {
    createAlbumSchema,
    updateAlbumSchema

};
