
import {userMutations,userQueries} from "./user";
import {trackMutations, trackQueries} from "./track";
import {albumMutations, albumQueries} from "./album";
import {musicDirectorsMutations, musicDirectorsQueries} from "./musicDirectors";


const resolvers = {
    Query: {
        ...userQueries,
        ...trackQueries,
        ...albumQueries,
        ...musicDirectorsQueries
    },
    Mutation: {
        ...userMutations,
        ...trackMutations,
        ...albumMutations,
        ...musicDirectorsMutations
    }
};

export default resolvers;
