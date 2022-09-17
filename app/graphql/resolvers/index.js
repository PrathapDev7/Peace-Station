
import {userMutations,userQueries} from "./user";
import {trackMutations, trackQueries} from "./track";
import {albumMutations, albumQueries} from "./album";


const resolvers = {
    Query: {
        ...userQueries,
        ...trackQueries,
        ...albumQueries,
    },
    Mutation: {
        ...userMutations,
        ...trackMutations,
        ...albumMutations,
    }
};

export default resolvers;
