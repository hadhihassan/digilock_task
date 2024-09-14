import { useContext } from 'react'
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";


export default function NavBarLayout() {

    const location = useLocation();

    let content;
    if (location.pathname === "/") {
        content = "Home";
    } else if (location.pathname === "/users") {
        content = "Register Users";
    } else {
        content = "";
    }

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate("/login")
    }
    return (
        <><div className="flex-row">
            <header className="sticky top-0 mb-6 bg-accent py-4 shadow">
                <div className="container flex justify-between">
                    <Link to="/" className="mt-auto">
                        <p className="mb-0 mt-auto font-display text-3xl font-bold ml-10">
                            {
                                content
                            }
                        </p>
                    </Link>
                    <nav className="flex gap-4 ">
                        {
                            location.pathname !== "/users" && <Link to="/users" className="text-white border py-2 font-semibold px-5 bg-violet-700 rounded-xl" >Users</Link>
                        }
                        <button className="text-white border py-2 font-semibold px-5 bg-violet-700 rounded-xl" onClick={handleLogout}>LogOut</button>
                    </nav>
                </div>
            </header>
            <Outlet />
        </div>
        </>
    );
}