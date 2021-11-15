import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var postSchema  = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        content: {
            type: String,
            required: true,
            maxlength: 2000
        },
        category: {
            type: ObjectId,
            ref: 'Category',
            required: true
        },
        user: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        downloads: {
            type: Number,
            default: 0
        },
        photos: {
            data: Buffer,
            contentType: String
        },
    },{timestamps: true}
);

mongoose.models = {};

var Post = mongoose.model('Post', postSchema);

export default Post;