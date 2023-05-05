const mongoose = require('mongoose');
const schema = mongoose.Schema;


const UserSchema = new schema(
    {
        email:{
            type: String,
            required: true
        },
        username:{
            type: String,
            required: true
        },
        mobile:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        avatar:{
            type: String
        },
        date:{
            type: Date,
            default: Date.now
        }
    }
)


module.exports = User = mongoose.model('user',UserSchema)