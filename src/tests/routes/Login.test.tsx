import { cleanup, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "../../routes/routes";
import { server } from "../mocks/apiServer/server";
import { rest } from "msw";
import ResponseBody from "../../models/api/ResponseBody";

beforeEach(() => {
    user.setup();

    const router = createMemoryRouter(routes, {
        initialEntries: ["/"]
    });

    render(<RouterProvider router={router} />);
});

afterEach(() => {
    cleanup();
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
});

const invalidEmails = [
    "",
    "1234@.com",
    "asdf4233example.com",
    "@example.com",
    "example@example",
    "example@example."
];

const invalidPasswords = [
    "",
    "pass",
    "1234",
    "password",
    "passwo3d",
    "Password",
    "Passwo3d",
    "P@ssword",
    "p@ssword123"
]

describe("Login Component Test(Invalid Data)", () => {
    test.each(invalidEmails)("Submit button is disabled with invalid email", async (email) => {
        const emailInput = screen.getByTestId("emailInput");
        const passwordInput = screen.getByTestId("passwordInput");

        await user.click(emailInput);
        // If it is blank, we just need to input a key here
        await user.keyboard(email === "" ? "Shift" : email);

        await user.click(passwordInput);
        await user.keyboard("P@ssword123");

        const submitButton = screen.getByTestId("loginButton");
        expect(submitButton).toBeDisabled();
    });

    test.each(invalidPasswords)("Submit button is disabled with invalid Password", async (password) => {
        const emailInput = screen.getByTestId("emailInput");
        const passwordInput = screen.getByTestId("passwordInput");

        await user.click(emailInput);
        await user.keyboard("example@email.com");

        await user.click(passwordInput);
        // If it is blank, we just need to input a key here
        await user.keyboard(password === "" ? "Shift" : password);

        const submitButton = screen.getByTestId("loginButton");
        expect(submitButton).toBeDisabled();
    });

    test("Invalid Login Attempt (500 or related Error)", async () => {
        server.use(rest.post(`${import.meta.env.VITE_API_URL}/api/user/login`, (req, res, ctx) => {
            return res(
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

    test.todo("Invalid Login Attempt (401: User already logged in)");
});