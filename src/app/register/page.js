'use client'
import Link from 'next/link'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { Toaster, toast } from 'sonner'

export default function Register() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const onSubmit = handleSubmit(async ({ name, email, password }) => {
        const { data } = await axios.post('/api/register', { name, email, password })
        const { user, message, status } = data
        if (status === 200) {
            await signIn('credentials', {
                redirect: true,
                callbackUrl: `${window.location.origin}/dashboard`,
                email: user.email,
                password: user.password,
                name: user.name,
                id: user._id
            })
        } else {
            toast.warning(message)
            reset({
                name: '',
                email: '',
                password: ''
            })
        }
    })

    return (
        <div className='h-[90vh] flex flex-col justify-center items-center'>
            <Toaster richColors closeButton position='top-center' />
            <form onSubmit={onSubmit} className='w-1/4'>
                <input
                    type='text'
                    {...register('name', {
                        required: {
                            value: true,
                            message: 'name is required',
                        },
                        minLength: {
                            value: 4,
                            message: 'min 4 characteres'
                        }
                    })}
                    className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                    placeholder='Nombre'
                />
                {errors.name && (
                    <span className='text-red-500 text-xs'>
                        {errors.name.message}
                    </span>
                )}
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
                    Registrarse
                </button>
                <p>¿Ya estás registrado? Inicia sesión <Link href='/login'>aquí</Link></p>
            </form>
        </div>
    )
}
