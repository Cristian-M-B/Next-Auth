import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    image: {
        type: String
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

const User = models.User || model('User', userSchema)

export default User