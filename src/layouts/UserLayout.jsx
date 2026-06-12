import {Link, Outlet} from 'react-router-dom'

function UserLayout() {
    return (
        <section>
            <nav className="navbar-user">
                <Link to="/">Inicio</Link> |
                <Link to="/user/dashboard">Dashboard Usuario</Link> |
            </nav>
            <main>
                <Outlet />
            </main>
        </section>
    )
}

export default UserLayout