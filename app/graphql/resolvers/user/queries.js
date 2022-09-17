
const userQueries = {
    // Fetch one User
    user: async (_, {id}) => {
        const user = await User.findById(id);
        return user;
    },
}

export default userQueries;
