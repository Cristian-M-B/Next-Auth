import { signIn } from 'next-auth/react'

export default function LogInWithGoogle() {

    async function onClick() {
        await signIn('google', {
            redirect: true,
            callbackUrl: `${window.location.origin}`
        })
    }

    return (
        <button
            onClick={onClick}
            className='flex items-center gap-4 border-2 p-4 w-full'
        >
            <img
                src='/google.png'
                className='h-8 w-8'
            />
            Inicia sesión con Google
        </button>
    )
}
