import {ApolloError} from "apollo-server-errors";
import {Track} from "../Models";

const trackFilter = async (trackInput) => {

    let filter = {
        album_name : trackInput.album_name
    };

    if (!trackInput.album_name)
        delete filter['album_name'];

    return await Track.find(filter);
};

module.exports = {
    trackFilter
};
