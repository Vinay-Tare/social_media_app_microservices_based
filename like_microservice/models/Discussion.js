import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DiscussionSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    hashtags: { type: [String], default: [] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamp: true });

const Discussion = mongoose.model('Discussion', DiscussionSchema);
export default Discussion;
