import { ChangeEvent, MouseEvent, useState } from "react";
import axios from "axios";
import ResponseBody from "../models/api/ResponseBody.model";
import { Link, useNavigate } from "react-router-dom";
import { useToastManager } from "../components/ToastManager.component";
import useEmail from "../hooks/useEmail.hook";
import usePassword from "../hooks/usePassword.hook";

const Login = (props: any) => {
    const { email, setEmail, isValidEmail } = useEmail();
    const { password, setPassword, isValidPassword } = usePassword();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const toastManager = useToastManager();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch(e.target.name) {
            case "email": setEmail(e.target.value); break;
            case "password": setPassword(e.target.value); break;
            default: break;
        }
    };

    const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setIsSubmitting(true);
        await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`, {
            email,
            password
        })
        .then((res: ResponseBody<String>) => {
            navigate("/home");
        })
        .catch((err: ResponseBody<String>) => {
            toastManager.addToast("error", "Please try again.", "An error occured...");
        })
        .finally(() => {
            setIsSubmitting(false);
        })
    };

    return (
        <div data-testid="loginComponentId">
            <h2>Todo App: An Application for Storing your lists of To-dos</h2>
            <form id="inputForm">
                <div className="form-group">
                    <div className="form-floating mb-3">
                        <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        data-testid="emailInput"
                        name="email"
                        placeholder=""
                        value={email}
                        onChange={handleChange} />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        name="password"
                        data-testid="passwordInput"
                        placeholder=""
                        minLength={8}
                        value={password}
                        onChange={handleChange} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                </div>
            </form>
            <div className="mt-2">
                <button
                type="submit"
                form="inputForm"
                className="btn btn-primary"
                data-testid="loginButton"
                disabled={isSubmitting || !isValidPassword || !isValidEmail}
                onClick={onSubmit}>
                        Login
                </button>
                <Link to="/signUp" className="btn btn-info" style={{marginLeft: "5px"}} data-testid="signUpButton">
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default Login;
