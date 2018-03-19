// import { SchemaTypes } from 'mongoose';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
        username: { 
            type: String, 
            required: true 
        },
        encryptedPassword: {
            type: String,
            required: true
        },
            cart: {
                type: [Schema.Types.ObjectId],

            }
    },

    {
        timestamps: true
    }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;