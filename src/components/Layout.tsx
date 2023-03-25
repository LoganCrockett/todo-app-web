import { useLocation, useNavigate } from "react-router-dom";
import ToastManager from "./ToastManager";
import axios from "axios";
import { useEffect } from "react";

const Layout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const authenticationInterceptor = axios.interceptors.response.use(undefined, (error: any) => {
            if (error.response.status === 401) {
                if (error.response.data.data && error.response.data.data.toLowerCase() === "user already logged in") {
                    // Navigate to home page
                    navigate("/home");
                }

                if (error.response.data.data && error.response.data.data.toLowerCase() === "user not logged in") {
                    // Navigate to Login page
                    navigate("/");
                }
            }

            return Promise.reject(error);
        });

        return () => {
            axios.interceptors.response.eject(authenticationInterceptor);
        };
    }, []);

    return (
        <>
            <Header />
            <ToastManager />
        </>
    );
};

const Header = () => {
    const location = useLocation();

    return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                    <a className="nav-link active" href="#">Home
                        <span className="visually-hidden">(current)</span>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Features</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Pricing</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">About</a>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Separated link</a>
                    </div>
                    </li>
                </ul>
                <form className="d-flex">
                    <input className="form-control me-sm-2" type="search" placeholder="Search" />
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                </form>
                </div>
            </div>
        </nav>
    </>
    );
};

export default Layout;