import {Track} from './../../../Models'
const trackQueries = {
    // Fetch one Track
    track: async (_, {id}) => {
        const track = await Track.findById(id)
        console.log(track);
        return track;
    },
};

export default trackQueries;
