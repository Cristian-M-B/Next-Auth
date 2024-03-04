import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    return (
        <div>
            <h3>DashboardPage</h3>
            {session ? <p>Bienvenido {session.user.name}</p> : <p>¡No estás logueado!</p>}
        </div>
    )
}
