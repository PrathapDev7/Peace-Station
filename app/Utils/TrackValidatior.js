import * as yup from "yup";

const createTrackSchema = yup.object().shape({
    track_name: yup.string().min(3, 'track name must be more than 3 characters').max(100).required({ track_name: 'track_name is required' }),
});

const updateTrackSchema = yup.object().shape({
    track_name: yup.string().min(3, 'track_name must be more than 3 characters').max(100).required({ track_name: 'track_name is required' }),
});

module.exports = {
    createTrackSchema,
    updateTrackSchema

};
