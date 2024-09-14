import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/constants";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
    comparePassword: (password: string) => Promise<boolean>;
    getJwtToken: () => string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'member'], default: 'member' }
});

userSchema
    .method(
        "comparePassword",
        async function (this: IUser, enteredPassword: string) {
            return bcrypt.compare(enteredPassword, this.password);
        });

userSchema
    .method(
        "getJwtToken",
        function (this: IUser) {
            const KEY = process.env.JWT_SECRET_KEY || ""
            const payload = {
                id: this._id,
                role: this.role,
                exp: Math.floor(Date.now() / 1000) + 12121,
                iat: Math.floor(Date.now() / 1000),
            }
            return jwt.sign(payload, KEY)
        });

const User = mongoose.model<IUser>('User', userSchema);
export default User;