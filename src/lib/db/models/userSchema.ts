import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    join: Date;
}


const UserSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    join: {
        type: Date,
        default: Date.now,
    }
});

// Check if the model already exists before creating it
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;