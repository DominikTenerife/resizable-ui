import { Link, NavLink } from "react-router-dom"

export default function Header() {
    return (
        <header>
            <Link to="/">Dominik's resizable UIs</Link>

            <nav>
                <NavLink
                    to="/example1"
                >
                    Example1
                </NavLink>
                <NavLink
                    to="/example2"
                >
                    Example2
                </NavLink>
                <NavLink
                    to="/example3"
                >
                    Example3
                </NavLink>
            </nav>


        </header>
    )
}