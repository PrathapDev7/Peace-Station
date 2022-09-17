import {ApolloError} from "apollo-server-errors";
import {Track} from "../Models";

const trackFilter = async (trackInput) => {

    let filter = {
        album_name : {'$regex': (!trackInput.album_name) ? '' : trackInput.album_name, '$options': 'i'},
    };

    if (!trackInput.album_name)
        delete filter['album_name'];

    return await Track.find(filter, {projection: {_id: 1}});
};

module.exports = {
    trackFilter
};
