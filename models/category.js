import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var categorySchema  = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000
        },
    },{timestamps: true}
);

mongoose.models = {};

var Category = mongoose.model('Category', categorySchema);

export default Category;