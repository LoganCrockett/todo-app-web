import { ChangeEvent, MouseEvent, useState } from "react";
import FloatingInput from "../components/FloatingInput.component";
import { useToastManager } from "../components/ToastManager.component";
import useEmail from "../hooks/useEmail.hook";
import usePassword from "../hooks/usePassword.hook";
import LinkButton from "../components/LinkButton.component";
import axios from "axios";
import ResponseBody from "../models/api/ResponseBody.model";
import { useNavigate } from "react-router-dom";
import PasswordRequirements from "../components/PasswordRequirements.component";

const SignUp = (props: any) => {
    const context = useToastManager();
    const navigate = useNavigate();

    const {email, setEmail, isValidEmail } = useEmail();
    const {password, setPassword, isValidPassword } = usePassword();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "email": setEmail(e.target.value); break;
            case "password": setPassword(e.target.value); break;
            case "firstName": setFirstName(e.target.value); break;
            case "lastName": setLastName(e.target.value); break;
            default: break;
        };
    };

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        await axios.post(`${import.meta.env.VITE_API_URL}/api/user`, {
            email,
            password,
            firstName,
            lastName
        })
        .then((res: ResponseBody<string>) => {
            context.addToast("success", "You will now be redirected to the Login Page", "Account Created!");
            navigate("/");
        })
        .catch((err: ResponseBody<string>) => {
            context.addToast("error", "Please Try Again", "An Error Occured");
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };
    
    return (
        <>
            <div data-testid="signUpPageContainer">
                <h2>Create an Account</h2>
                <form id="signUpForm">
                    <div className="form-group">
                        <FloatingInput
                        testId="firstNameInput"
                        value={firstName}
                        name="firstName"
                        handleChange={handleChange}
                        labelText="First Name"
                        placeholder=""
                        />
                        <FloatingInput
                        testId="lastNameInput"
                        value={lastName}
                        name="lastName"
                        handleChange={handleChange}
                        labelText="Last Name"
                        placeholder=""
                        />
                        <FloatingInput
                        testId="emailInput"
                        value={email}
                        name="email"
                        handleChange={handleChange}
                        labelText="Email Address"
                        placeholder=""
                        />
                        <PasswordRequirements password={password} />
                        <FloatingInput
                        testId="passwordInput"
                        value={password}
                        name="password"
                        handleChange={handleChange}
                        labelText="Password"
                        placeholder=""
                        />
                    </div>
                </form>
                <button
                role="submit"
                form="signUpForm"
                data-testid="signUpButton"
                className="btn"
                onClick={handleSubmit}
                disabled={!isValidEmail || !isValidPassword || firstName === "" || lastName === "" || isSubmitting}
                >
                    Sign Up
                </button>
                <LinkButton to={"/"} buttonText="Return to Login" testId="loginPageButton" />
            </div>
        </>
    );
};

export default SignUp;