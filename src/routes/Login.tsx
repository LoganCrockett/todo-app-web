import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import ResponseBody from "../models/api/ResponseBody";
import { Link, useNavigate } from "react-router-dom";

const Login = (props: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsValidEmail(
            // Per RFC 2822 Guidelines
            email.match(/([A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]+)(?:\.*[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]*)@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)?.length === 1
        );
    }, [email]);

    useEffect(() => {
        /*
        * At least One Uppercase letter
        * At least One lower case letter
        * At least One special Character (See here:https://owasp.org/www-community/password-special-characters)
        * At least
        * */
        setIsValidPassword(
            password.match(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,}$/gm)?.length === 1
        );
    }, [password])

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

        })
        .finally(() => {
            setIsSubmitting(false);
        })
    };

    return (
        <div data-testid="loginComponentId">
            <h2>Todo App: An Application for Storing your lists of To-dos</h2>
            <form>
                <div className="form-group">
                    <div className="form-floating mb-3">
                        <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        data-testid="emailInput"
                        name="email"
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
                        minLength={8}
                        value={password}
                        onChange={handleChange} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                </div>
                <div className="mt-2">
                    <button
                    type="submit"
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
            </form>
        </div>
    );
};

export default Login;
