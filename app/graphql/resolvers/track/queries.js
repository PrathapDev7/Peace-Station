import {Album, Track} from './../../../Models'
import {ApolloError} from "apollo-server-errors";
const trackQueries = {
    // Fetch one Track

    searchTracks: async (_, {params}) => {
        try{
            let perPageItems = 10;
            const page = params.page ? params.page : 1 ;
            if(params.per_page_items){
                perPageItems = params.per_page_items;
            }
            const limit = page * perPageItems ;

            if (!params.track_name)
                params.track_name = '';

            let filters = {};

            const sort = {};

            if (params.sort) {
                let sortParam = params.sort.split('.');
                let sortKey = sortParam[0];
                let sortVal = sortParam[1];
                sort[sortKey] = sortVal
            }

            if(params.track_name){
                filters['track_name'] = params.track_name;
            }
            if(params.artists.singer){
                filters['artists'] = params.artists.singer;
            }

            const tracks = await Track.find(filters).sort(sort)
                .limit(limit * 1)
                .skip((page - 1) * perPageItems)
                .exec();
            const allTracks = await Track.find(filters).countDocuments();

            return {
                totalPages: Math.ceil(Number(allTracks / perPageItems)),
                tracks: tracks,
                currentPage: page,
                totalItems: allTracks,
            };
        } catch (err) {
            var error = err.inner && err.inner.length ? err.inner[0].message : err;
            return new ApolloError(error);
        }
    },

    track: async (_, {id}) => {
        const track = await Track.findById(id);
        console.log(track);
        return track;
    },
};

export default trackQueries;
