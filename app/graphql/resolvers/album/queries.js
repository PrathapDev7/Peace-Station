import {Album , Track} from './../../../Models'
import moment from "moment";
import {trackFilter} from "../../../Utils/Helpers";
import {ApolloError} from "apollo-server-errors";
const albumQueries = {

    // Fetch one Album
    album: async (_, {id}) => {
        const album = await Album.findById(id);
        return album;
    },
};

export default albumQueries;
