import { NextResponse } from 'next/server'
import connectionDB from '@/libs/db'
import User from '@/models/user'

export async function POST(request) {
    connectionDB()
    const { name, email, password } = await request.json()
    const user = await User.findOne({ email: email }).lean()
    if (user) {
        return NextResponse.json({ message: '¡Ya hay un usuario registrado con este email!', status: 400 })
    } else {
        const newUser = new User({
            name: name,
            email: email,
            password: password
        })
        const userSaved = await newUser.save()
        return NextResponse.json({ user: userSaved, status: 200 })
    }
}