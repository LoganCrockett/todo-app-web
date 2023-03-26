import { cleanup, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { server } from "../mocks/apiServer/server.mock";
import { rest } from "msw";
import ResponseBody from "../../models/api/ResponseBody.model";
import renderRouter from "../utils/router.utils";

beforeEach(() => {
    renderRouter(["/"]);
});

describe("Login Component Test (Valid Data)", () => {
    test("Successful login attempt", async () => {
        const emailInput = screen.getByTestId("emailInput");
        const passwordInput = screen.getByTestId("passwordInput");

        await user.click(emailInput);
        await user.keyboard("example@email.com");

        await user.click(passwordInput);
        await user.keyboard("P@ssword123");

        const submitButton = screen.getByTestId("loginButton");
        expect(submitButton).toBeEnabled();

        await user.click(submitButton);

        expect(screen.getByTestId("homePageContainer")).toBeInTheDocument();
    });

    test("Sign-Up Button Routes Correctly", async () => {
        const signUpButton = screen.getByTestId("signUpButton");

        await user.click(signUpButton);

        expect(screen.getByTestId("signUpPageContainer")).toBeInTheDocument();
    });

    test("Invalid Login Attempt (401: User Already Logged In)", async () => {
        server.use(rest.post(`${import.meta.env.VITE_API_URL}/api/user/login`, (req, res, ctx) => {
            return res.once(
                ctx.status(401),
                ctx.json<ResponseBody<string>>({
                    data: "user already logged in"
                })
            );
        }));
        const emailInput = screen.getByTestId("emailInput");
        const passwordInput = screen.getByTestId("passwordInput");

        await user.click(emailInput);
        await user.keyboard("example@email.com");

        await user.click(passwordInput);
        await user.keyboard("P@ssword123");

        const submitButton = screen.getByTestId("loginButton");
        expect(submitButton).toBeEnabled();

        await user.click(submitButton);

        expect(screen.getByTestId("homePageContainer")).toBeInTheDocument();
    });
});

describe("Login Component Test(Invalid)", () => {
    test("Submit button is disabled with invalid email", async () => {
        const emailInput = screen.getByTestId("emailInput");
        const passwordInput = screen.getByTestId("passwordInput");

        await user.click(emailInput);
        await user.keyboard("email");

        await user.click(passwordInput);
        await user.keyboard("P@ssword123");

        const submitButton = screen.getByTestId("loginButton");
        expect(submitButton).toBeDisabled();
    });

    test("Submit button is disabled with invalid Password", async () => {
        const emailInput = screen.getByTestId("emailInput");
        const passwordInput = screen.getByTestId("passwordInput");

        await user.click(emailInput);
        await user.keyboard("example@email.com");

        await user.click(passwordInput);
        await user.keyboard("password");

        const submitButton = screen.getByTestId("loginButton");
        expect(submitButton).toBeDisabled();
    });

    test("Invalid Login Attempt (500 or related Error)", async () => {
        server.use(rest.post(`${import.meta.env.VITE_API_URL}/api/user/login`, (req, res, ctx) => {
            return res.once(
                ctx.status(500),
                ctx.json<ResponseBody<string>>({
                    data: "An error occured. Please try again"
                })
            );
        }));
        const emailInput = screen.getByTestId("emailInput");
        const passwordInput = screen.getByTestId("passwordInput");

        await user.click(emailInput);
        await user.keyboard("example@email.com");

        await user.click(passwordInput);
        await user.keyboard("P@ssword123");

        const submitButton = screen.getByTestId("loginButton");
        expect(submitButton).toBeEnabled();

        await user.click(submitButton);

        expect(screen.getByRole("alert")).toBeInTheDocument();
    });
});