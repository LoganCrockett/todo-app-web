import { ChangeEvent, MouseEvent, useState } from "react";
import axios from "axios";
import ResponseBody from "../models/api/ResponseBody.model";
import { useNavigate } from "react-router-dom";
import { useToastManager } from "../components/ToastManager.component";
import useEmail from "../hooks/useEmail.hook";
import usePassword from "../hooks/usePassword.hook";
import LinkButton from "../components/LinkButton.component";
import FloatingInput from "../components/FloatingInput.component";

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
                    <FloatingInput
                    id="emailInput"
                    testId="emailInput"
                    name="email"
                    type="email"
                    placeholder=""
                    value={email}
                    handleChange={handleChange}
                    labelText="Email Address"
                    />
                    <FloatingInput
                    id="passwordInput"
                    testId="passwordInput"
                    type="password"
                    placeholder=""
                    name="password"
                    minLength={8}
                    value={password}
                    handleChange={handleChange}
                    labelText="Password"
                    />
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
                <LinkButton to={"/signUp"} buttonText={"Sign Up"} buttonStyle={{marginLeft: "5px"}} testId={"signUpButton"} />
            </div>
        </div>
    );
};

export default Login;
