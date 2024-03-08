import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectionDB from '@/libs/db'
import User from '@/models/user'

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                return {
                    id: credentials.id,
                    name: credentials.name,
                    email: credentials.email
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === 'google') {
                connectionDB()
                const userDB = await User.findOne({ email: user.email }).lean()
                if (!userDB) {
                    const newUser = new User({
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        image: user.image
                    })
                    const userSaved = await newUser.save()
                } 
            }
            return true
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }