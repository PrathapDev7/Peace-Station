import {Album} from './../../../Models';
import {ApolloError} from "apollo-server-errors";

const albumQueries = {

    searchAlbums: async (_, {params}) => {
        try{
            let perPageItems = 10;
            const page = params.page ? params.page : 1 ;
            if(params.per_page_items){
                perPageItems = params.per_page_items;
            }
            const limit = page * perPageItems ;

            if (!params.album_name)
                params.album_name = '';

            let filters = {};

            const sort = {};

            if (params.sort) {
                let sortParam = params.sort.split('.');
                let sortKey = sortParam[0];
                let sortVal = sortParam[1];
                sort[sortKey] = sortVal
            }

            if(params.album_name){
                filters['album_name'] = params.album_name;
            }
            if(params.tracks){
                filters['tracks'] = params.tracks;
            }
            if(params.album_released_year){
                filters['album_released_year'] = params.album_released_year;
            }
            if(params.music_director){
                filters['music_director'] = params.music_director;
            }

            const albums = await Album.find(filters).populate({path: "tracks"}).sort(sort)
                .limit(limit * 1)
                .skip((page - 1) * perPageItems)
                .exec();
            const allAlbums = await Album.find(filters).countDocuments();

            return {
                totalPages: Math.ceil(Number(allAlbums / perPageItems)),
                albums: albums,
                currentPage: page,
                totalItems: allAlbums,
            };
        } catch (err) {
            var error = err.inner && err.inner.length ? err.inner[0].message : err;
            return new ApolloError(error);
        }
    },
    /**
     * function to fetch the doctor details by doctor's id
     * @param _
     * @param id - id of a doctor
     * @returns {Promise<*>}
     *      success -> returns details of the doctor
     */
    album: async (_, {id}) => {
        try{
            return await Album.findById(id).populate({path: "tracks"});
        } catch (err) {
            var error = err.inner && err.inner.length ? err.inner[0].message : err;
            return new ApolloError(error);
        }
    },

    albums: async () => {
        try {
            const albums = await Album.find({})
            console.log(albums);
            return albums
        } catch (err) {
            var error = err.inner && err.inner.length ? err.inner[0].message : err;
            return new ApolloError(error);
        }
    },
};

export default albumQueries;
