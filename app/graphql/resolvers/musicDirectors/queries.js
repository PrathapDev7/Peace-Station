import {MusicDirectors} from './../../../Models';
import {ApolloError} from "apollo-server-errors";

const musicDirectorsQueries = {

    /**
     * function to get degree list
     * @param name
     * @param params
     * @returns degree
     *      success -> returns list of the degree
     */
    searchMusicDirectors: async () => {
        try{
            return await MusicDirectors.find().sort({name: 'asc'});
        } catch (err) {
            var error = err.inner && err.inner.length ? err.inner[0].message : err;
            return new ApolloError(error);
        }
    }
};

export default musicDirectorsQueries;
