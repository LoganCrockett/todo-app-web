import { useLocation, useNavigate } from "react-router-dom";
import ToastManager from "./ToastManager.component";
import axios from "axios";
import { useEffect } from "react";
import "../assets/styles/components/Layout.style.css";
import Header from "./Header.component";
import Footer from "./Footer.component";

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
            <div id="mainGridParent">
                <Header />
                <ToastManager />
                <Footer />
            </div>
        </>
    );
};

export default Layout;