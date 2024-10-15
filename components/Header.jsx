import { Link, NavLink } from "react-router-dom"

export default function Header() {

    const activeStyles = {
        fontWeight: "bold",
        color: "lightblue",
        textDecoration: "underline",
        textDecorationColor: "orange",
        textDecorationThickness: "5px"
    }


    return (
        <header>
            <Link to="/">Dominik's resizable UIs</Link>

            <nav>
                <NavLink
                    to="/example1"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Standard
                </NavLink>
                <NavLink
                    to="/example2"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Animate
                </NavLink>
                <NavLink
                    to="/example3"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Ghost
                </NavLink>
                <NavLink
                    to="/example4"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Helper
                </NavLink>
            </nav>


        </header>
    )
}