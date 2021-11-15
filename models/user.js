import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var userSchema  = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: 32
        },
        password: {
            type: String,
            required: true
        },
        about: {
            type: String,
            trim: true
        },
        picture: {
            data: Buffer,
            contentType: String
        },
        role: {
            type: Number,
            default: 0
        },
        history: {
            type: Array,
            default: []
        }
    },{timestamps: true}
);

mongoose.models = {};

var User = mongoose.model('User', userSchema);

export default User;