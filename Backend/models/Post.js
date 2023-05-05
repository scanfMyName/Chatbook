const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

// creating a post model using schema
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    likes:[
        {
            user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
            }
        }
    ],
    dislikes:[
        {
            user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
            }
        }
    ],
    comments :[
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Post = mongoose.model('post', PostSchema);