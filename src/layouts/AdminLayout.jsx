import {Link, Outlet} from 'react-router-dom'

function AdminLayout() {
    return (
        <section>
            <nav className="navbar-admin">
                <Link to="/">Inicio</Link> |
                <Link to="/admin/dashboard">Dashboard Admin</Link>
            </nav>

            <main>
                <Outlet />
            </main>
        </section>
    )
}

export default AdminLayout