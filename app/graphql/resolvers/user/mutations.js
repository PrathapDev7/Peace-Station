import {User} from './../../../Models'
import {ApolloError, AuthenticationError} from 'apollo-server-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {loginSchema, createUserSchema, updateUserSchema} from '../../../Utils/UserValidator';

const CryptoJS = require("crypto-js");
const nodeBase64 = require('nodejs-base64-converter');

const userMutations = {

    /**
     * function to create new user
     * @param _
     * @param user
     * @returns {Promise<ApolloError|*>}
     *      success - create new user
     *      failure - return validation error
     */
    createUser: async (_, {user}) => {
        try{
            await createUserSchema.validate(user, {abortEarly: false});

            user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
            // Checking if already any user exists with Same Credentials
            const existing = await User.find({email: user.email.toLowerCase()});
            if (existing.length > 0) {
                throw new ApolloError('Email already exists');
            }
            const existingPhone = await User.find({mobile_number: user.mobile_number});
            if (existingPhone.length > 0) {
                throw new ApolloError('Mobile Number already exists');
            }
            user.email = user.email.toLowerCase();
            user.status = true;
            const newUser = new User(user);
            const token = jwt.sign({
                id: newUser.id,
                email: newUser.email,
                issued: Date.now()
            }, process.env.JWT_SECRET);
            Object.assign(newUser, {token});
            return newUser.save();
        } catch (err) {
            var error = err.inner && err.inner.length ? err.inner[0].message : err;
            return new ApolloError(error);
        }
    },

    /**
     * function to update the user's info
     * @param _
     * @param user
     * @returns {Promise<ApolloError>}
     *      success - update the user's profile info
 *          failure - validation errors
     */
    updateUser: async (_, {user}) => {
        try{
            await updateUserSchema.validate(user, {abortEarly: false});

            const existUser = await User.findOne({id: user.id});
            if(!existUser){
                throw new ApolloError('Invalid user selected.');
            }

            if(user.password){
                user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
            } else{
                user.password = existUser.password;
            }

            return await User.findOneAndUpdate({
                _id: user.id
            }, {
                $set:{
                    first_name: user.first_name,
                    last_name: user.last_name,
                    gender: user.gender,
                    dob: user.dob,
                    password : user.password,
                    status : user.status
                }
            }, {returnOriginal: false});
        } catch (err) {
            var error = err.inner && err.inner.length ? err.inner[0].message : err;
            return new ApolloError(error);
        }
    }
}

export default userMutations;
