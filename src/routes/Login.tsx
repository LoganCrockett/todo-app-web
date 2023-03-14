import { ChangeEvent, Component, MouseEvent } from "react";
import LoginComponentState from "../models/components/LoginComponentState";
import axios from "axios";
import ResponseBody from "../models/api/ResponseBody";
import { Link, Navigate } from "react-router-dom";

export default class Login extends Component<any, LoginComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isSubmitting: false,
            wasLoggedIn: false,
            isValidEmail: false,
            isValidPassword: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        } as unknown as Pick<LoginComponentState, keyof LoginComponentState>, () => {
            this.isValidEmail();
            this.isValidPassword();
        });
    }

    private isValidEmail() {
        // Per RFC2822 Guidelines
        this.setState({
            isValidEmail: this.state.email.match(/([A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]+)(?:\.*[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]*)@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)?.length === 1
        });
    }

    private isValidPassword(): void {
        /*
         * At least One Uppercase letter
         * At least One lower case letter
         * At least One special Character (See here:https://owasp.org/www-community/password-special-characters)
         * At least 8 Characters in length
         */
        this.setState({
            isValidPassword: this.state.password.match(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,}$/gm)?.length === 1
        });
    }

    async onSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`, {
            email: this.state.email,
            password: this.state.password
        })
        .then((res: ResponseBody<String>) => {
            this.setState({
                wasLoggedIn: true
            });
        })
        .catch((err: ResponseBody<String>) => {

        });
    }

    render() {
        return (
            <div data-testid="loginComponentId">
                <h2>Todo App: An Application for Storing your lists of To-dos</h2>
                <form>
                    <div className="form-group">
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" name="email" value={this.state.email} onChange={this.handleChange} />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            name="password"
                            minLength={8}
                            value={this.state.password}
                            onChange={this.handleChange} />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                    </div>
                    <div className="mt-2">
                        <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={this.state.isSubmitting || !this.state.isValidPassword || !this.state.isValidEmail}
                        onClick={this.onSubmit}>
                                Login
                        </button>
                        <Link to="/signUp" className="btn btn-info" style={{marginLeft: "5px"}}>
                            Sign Up
                        </Link>
                    </div>
                </form>
                {this.state.wasLoggedIn && <Navigate to={"/home"} />}
            </div>
        );
    };
}