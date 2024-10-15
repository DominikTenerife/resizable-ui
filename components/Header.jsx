import { Link, NavLink } from "react-router-dom"

export default function Header() {
    return (
        <header>
            <Link to="/">Dominik's resizable UIs</Link>

            <nav>
                <NavLink
                    to="/example1"
                >
                    Standard
                </NavLink>
                <NavLink
                    to="/example2"
                >
                    Animate
                </NavLink>
                <NavLink
                    to="/example3"
                >
                    Ghost
                </NavLink>
                <NavLink
                    to="/example4"
                >
                    Helper
                </NavLink>
            </nav>


        </header>
    )
}