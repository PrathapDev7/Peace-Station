import {MusicDirectors} from './../../../Models'
import {ApolloError, AuthenticationError} from 'apollo-server-errors';

const musicDirectorsMutations = {

    /**
     * function to create new degree
     * @param _
     * @param degree
     * @returns {Promise<ApolloError|*>}
     *      success - create new degree
     */
    createMusicDirectors: async (_, {musicDirectors}) => {
        try{
            const saveMusicDirectors = new MusicDirectors(musicDirectors);
            return await saveMusicDirectors.save();
        } catch (err) {
            var error = err.inner && err.inner.length ? err.inner[0].message : err;
            return new ApolloError(error);
        }
    }
};

export default musicDirectorsMutations;
