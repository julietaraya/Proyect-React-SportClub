import {Link, Outlet} from 'react-router-dom'

function CoachLayout() {
    return (
        <section>
            <nav className="navbar-coach">
                <Link to="/">Inicio</Link> |
                <Link to="/coach/dashboard">Dashboard Coach</Link> |
            </nav>
            <main>
                <Outlet />
            </main>
        </section>
    )
}

export default CoachLayout