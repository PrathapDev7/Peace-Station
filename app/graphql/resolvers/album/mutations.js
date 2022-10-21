import {Album, Track} from './../../../Models'
import {ApolloError, AuthenticationError} from 'apollo-server-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {createAlbumSchema, updateAlbumSchema} from '../../../Utils/AlbumValidator';

const CryptoJS = require("crypto-js");
const nodeBase64 = require('nodejs-base64-converter');

const albumMutations = {

    /**
     * function to create new track
     * @param _
     * @param album
     * @returns {Promise<ApolloError|*>}
     *      success - create new album
     *      failure - return validation error
     */
    createAlbum: async (_, {album}) => {
        try{
            await createAlbumSchema.validate(album, {abortEarly: false});

            // Checking if already any doctor exists with Same Credentials
            const existing = await Album.find({album_name: album.album_name.toLowerCase()});
            if (existing.length > 0) {
                throw new ApolloError('Album already exists');
            }
            album.album_name = album.album_name.toLowerCase();
            album.status = true;

            const saveAlbum = new Album(album);
            return saveAlbum.save();
        } catch (err) {
            var error = err.inner && err.inner.length ? err.inner[0].message : err;
            return new ApolloError(error);
        }
    },

    /**
     * function to update the album's
     * @param _
     * @param album
     * @returns {Promise<ApolloError>}
     *      success - update the album's data info
     *          failure - validation errors
     */
    updateAlbum: async (_, {id, album}) => {
        try{
            await updateAlbumSchema.validate(album, {abortEarly: false});

            const albumDetails = await Album.findOne({_id : id});
            if(!albumDetails){
                throw new ApolloError('Invalid album details.');
            }

            return await Album.findOneAndUpdate({
                _id: id
            }, {
                $set: album
            }, { returnOriginal: false })
        } catch (err) {
            var error = err.inner && err.inner.length ? err.inner[0].message : err;
            return new ApolloError(error);
        }
    },


    populateAlbum: async (_, {album_name, album}) => {
        let arrId=[];
        try{
            await updateAlbumSchema.validate(album, {abortEarly: false});

            const albumDetails = await Album.findOne({"album_name" : album_name});
            if(!albumDetails ){
                //console.log("not found");
                throw new ApolloError('Invalid album details.');
            }
            if(albumDetails.tracks.length){
                await Album.findOneAndUpdate( {"album_name" : album_name}, { $pop: { tracks : -1 } } );
                const getAllTracks = await Track.find({"album_name" : album_name});
                const getAllTrack = await Album.find({});
                getAllTracks.map((id,key)=>{
                    //arrId.push(id._id);
                    arrId.push(id);
                });
            }

            const getAllTracks = await Track.find({"album_name" : album_name});
            //console.log("result",getAllTracks);
            getAllTracks.map((id,key)=>{
                //arrId.push(id._id.toString());
                arrId.push(id);
            });
            console.log(arrId);
            return await Album.findOneAndUpdate({
                "album_name" : album_name
            },{
                $push: { "tracks":  arrId }
            });
        } catch (err) {
            var error = err.inner && err.inner.length ? err.inner[0].message : err;
            console.log("err", err);
            return new ApolloError(error);
        }
    }

};

export default albumMutations;
