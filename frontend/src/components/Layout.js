import { Outlet } from "react-router-dom"
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import React, { useContext } from "react";


const Layout = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        try {
          localStorage.removeItem("authToken");
          setAuth(null);
          navigate("/login");
        } catch (error) {
          console.error("Logout failed:", error);
        }
      };


    return (
        <main className="App">
            <div className="Nav">
               <h1>IVADEV</h1>
               <Link to="/home">Home</Link>
               <Link to="/login">Login</Link>             
               <Link to="/admin">Admin</Link>
               <Link onClick={logout} to="">Sign Out</Link>
            </div>
               <Outlet />        
        </main>
    )
}

export default Layout
