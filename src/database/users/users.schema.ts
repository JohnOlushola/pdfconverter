import { Schema } from 'mongoose';
import { findOneOrCreate, findByPermission } from './users.statics';
import { setLastUpdated, sameLastName } from './users.methods';

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permission: Number,
    dateOfEntry: {
        type: Date,
        default: new Date(),
    },
    lastUpdated: {
        type: Date,
        default: new Date(),
    }
});

UserSchema.statics.findOneOrCreate = findOneOrCreate;
UserSchema.statics.findByPermission = findByPermission;

UserSchema.methods.setLastUpdated = setLastUpdated;
UserSchema.methods.sameLastName = sameLastName;

export default UserSchema;