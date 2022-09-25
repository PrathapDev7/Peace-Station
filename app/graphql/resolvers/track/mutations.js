import {Track} from './../../../Models'
import {ApolloError, AuthenticationError} from 'apollo-server-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {createTrackSchema, updateTrackSchema} from '../../../Utils/TrackValidatior';

const CryptoJS = require("crypto-js");
const nodeBase64 = require('nodejs-base64-converter');

const trackMutations = {

    /**
     * function to create new track
     * @param _
     * @param track
     * @returns {Promise<ApolloError|*>}
     *      success - create new track
     *      failure - return validation error
     */
    createTrack: async (_, {track}) => {
        try{
            await createTrackSchema.validate(track, {abortEarly: false});

            // Checking if already any doctor exists with Same Credentials
            const existing = await Track.find({track_name: track.track_name.toLowerCase()});
            if (existing.length > 0) {
                throw new ApolloError('Track already exists');
            }
            track.track_name = track.track_name.toLowerCase();
            track.status = true;

            const saveTrack = new Track(track);
            return await saveTrack.save();
        } catch (err) {
            const error = err.inner && err.inner.length ? err.inner[0].message : err;
            return new ApolloError(error);
        }
    },

    /**
     * function to update the track's
     * @param _
     * @param track
     * @returns {Promise<ApolloError>}
     *      success - update the track's data info
 *          failure - validation errors
     */
    updateTrack: async (_, {id, track}) => {
        try{
            await updateTrackSchema.validate(track, {abortEarly: false});

            const trackDetails = await Track.findOne({_id : id});
            if(!trackDetails){
                throw new ApolloError('Invalid track details.');
            }

            return await Track.findOneAndUpdate({
                _id: id
            }, {
                $set: track
            }, { returnOriginal: false })
        } catch (err) {
            var error = err.inner && err.inner.length ? err.inner[0].message : err;
            return new ApolloError(error);
        }
    }
}

export default trackMutations;
