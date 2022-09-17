import { ApolloServer, UserInputError, AuthenticationError } from 'apollo-server-express';
import schema from './schema';
import jwt from 'jsonwebtoken';
import { User } from '../Models';

const apolloServer = new ApolloServer({
	schema,
	playground: 'development',
});

const getUser = async (token) => {
	if (token) {
		try {
			// return the user information from the token
			return jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
				return await User.findById(decoded.id);
			} /*process.env.JWT_SECRET*/);
		} catch (err) {
			// if there's a problem with the token, throw an error
			return { error: true, msg: "Session invalid" };
		}
	}
}

export default apolloServer;
