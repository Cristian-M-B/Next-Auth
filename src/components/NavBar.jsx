import Link from 'next/link'
import LogOut from './LogOut'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function NavBar() {

    const session = await getServerSession(authOptions)

    return (
        <nav className='h-[10vh] bg-orange-300 flex items-center justify-between px-6'>
            <Link href='/'>
                Home
            </Link>
            {session
                ? (
                    <div className='flex items-center gap-2'>
                        <Link href='/dashboard'>
                            Dashboard
                        </Link>
                        <LogOut />
                    </div>
                )
                : (
                    <div className='flex items-center gap-2'>
                        <Link href='/register'>
                            Registrarse
                        </Link>
                        <Link href='/login'>
                            Login
                        </Link>
                    </div>
                )
            }
        </nav>
    )
}
