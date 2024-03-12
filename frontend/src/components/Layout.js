import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"

const Layout = () => {
    return (
        <main className="App">
            <h1>Hello Home</h1>
            <Link to="/login">Login</Link>
            <Link to="/home">Home</Link>
            <Outlet />
        </main>
    )
}

export default Layout
