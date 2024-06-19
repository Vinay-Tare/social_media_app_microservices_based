import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likedEntity: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'likedEntityType',
    },
    likedEntityType: {
        type: String,
        required: true,
        enum: ['Discussion', 'Comment'],
    },
}, { timestamps: true });

const Like = mongoose.model('Like', likeSchema);
export default Like;
