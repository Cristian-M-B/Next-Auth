import { NextResponse } from 'next/server'
import connectionDB from '@/libs/db'
import User from '@/models/user'

export async function GET(request) {
    connectionDB()
    const email = request.nextUrl.searchParams.get('email')
    const password = request.nextUrl.searchParams.get('password')
    const user = await User.findOne({ email: email }).lean()
    if (user) {
        if (user.password === password) {
            return NextResponse.json({ user, status: 200 })
        } else {
            return NextResponse.json({ message: '¡El email y la contraseña no coinciden!', status: 400 })
        }
    } else {
        return NextResponse.json({ message: '¡No hay un usuario registrado con este email!', status: 400 })
    }
}