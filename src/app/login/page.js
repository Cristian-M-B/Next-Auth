'use client'
import Link from 'next/link'
import axios from 'axios'
import LogIn from '@/components/LogIn'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { Toaster, toast } from 'sonner'

export default function Login() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const onSubmit = handleSubmit(async ({ email, password }) => {
        const { data } = await axios.get(`/api/user?email=${email}&password=${password}`)
        const { user, message, status } = data
        if (status === 200) {
            await signIn('credentials', {
                redirect: true,
                callbackUrl: `${window.location.origin}/dashboard`,
                name: user.name,
                email: user.email,
                id: user._id
            })
        } else {
            toast.warning(message)
            reset({
                email: '',
                password: ''
            })
        }
    })


    return (
        <div className='h-[90vh] flex flex-col justify-center items-center'>
            <Toaster position='top-center' richColors closeButton />
            <form onSubmit={onSubmit} className='w-1/4'>
                <input
                    type='email'
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'Email is required',
                        },
                    })}
                    className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                    placeholder='Email'
                />
                {errors.email && (
                    <span className='text-red-500 text-xs'>
                        {errors.email.message}
                    </span>
                )}
                <input
                    type='password'
                    {...register('password', {
                        required: {
                            value: true,
                            message: 'Password is required',
                        },
                        minLength: {
                            value: 8,
                            message: 'min 8 characteres'
                        },
                        maxLength: {
                            value: 16,
                            message: 'max 16 characteres'
                        }
                    })}
                    className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                    placeholder='Contraseña'
                />
                {errors.password && (
                    <span className='text-red-500 text-xs'>
                        {errors.password.message}
                    </span>
                )}
                <button className='w-full bg-blue-500 text-white p-3 rounded-lg'>
                    Iniciar Sesión
                </button>
                <p>¿No estás registrado? Registrate <Link href='/register'>aquí</Link></p>
                <div className='my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300'>
                    <p className='mx-4 mb-0 text-center font-semibold'>O</p>
                </div>
            </form>
            <div className='w-1/4'>
                <LogIn />
            </div>
        </div>
    )
}
