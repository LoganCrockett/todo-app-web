import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import renderRouter from "../utils/router.utils";
import { server } from "../mocks/apiServer/server.mock";
import { rest } from "msw";
import ResponseBody from "../../models/api/ResponseBody.model";

beforeEach(() => {
    renderRouter({ initialEntries: ["/signUp"]});
});

describe("Sign Up Compnent Tests (Valid Data)", () => {

    test("Login Page Button routes correctly", async () => {
        await user.click(screen.getByTestId("loginPageButton"));

        expect(screen.getByTestId("loginComponentId")).toBeInTheDocument();
    });

    test("Valid Sign Up Attempt", async () => {
        const emailInput = screen.getByTestId("emailInput");
        const passwordInput = screen.getByTestId("passwordInput");
        const firstNameInput = screen.getByTestId("firstNameInput");
        const lastNameInput = screen.getByTestId("lastNameInput");

        await user.click(firstNameInput);
        await user.keyboard("John");

        await user.click(lastNameInput);
        await user.keyboard("Smith");

        await user.click(emailInput);
        await user.keyboard("example@email.com");

        await user.click(passwordInput);
        await user.keyboard("P@ssword1234");

        const signUpButton = screen.getByTestId("signUpButton");

        expect(signUpButton).toBeEnabled();

        await user.click(signUpButton);

        expect(screen.getByRole("alert")).toBeInTheDocument();

        expect(screen.getByTestId("loginComponentId")).toBeInTheDocument();
    });
});

describe("Sign Up Component Tests (Invalid Data)", () => {

    test("Sign Up Button should be disabled with Invalid Email", async () => {
        const emailInput = screen.getByTestId("emailInput");
        const passwordInput = screen.getByTestId("passwordInput");
        const firstNameInput = screen.getByTestId("firstNameInput");
        const lastNameInput = screen.getByTestId("lastNameInput");

        await user.click(firstNameInput);
        await user.keyboard("John");

        await user.click(lastNameInput);
        await user.keyboard("Smith");

        await user.click(emailInput);
        await user.keyboard("invalidemail");

        await user.click(passwordInput);
        await user.keyboard("P@ssword1234");

        expect(screen.getByTestId("signUpButton")).toBeDisabled();
    });

    test("Sign Up Button should be disabled with Invalid Password", async () => {
        const emailInput = screen.getByTestId("emailInput");
        const passwordInput = screen.getByTestId("passwordInput");
        const firstNameInput = screen.getByTestId("firstNameInput");
        const lastNameInput = screen.getByTestId("lastNameInput");

        await user.click(firstNameInput);
        await user.keyboard("John");

        await user.click(lastNameInput);
        await user.keyboard("Smith");

        await user.click(emailInput);
        await user.keyboard("example@email.com");

        await user.click(passwordInput);
        await user.keyboard("password");

        expect(screen.getByTestId("signUpButton")).toBeDisabled();
    });

    test("Sign Up Button should be disabled with Invalid First Name", async () => {
        const emailInput = screen.getByTestId("emailInput");
        const passwordInput = screen.getByTestId("passwordInput");
        const lastNameInput = screen.getByTestId("lastNameInput");

        await user.click(lastNameInput);
        await user.keyboard("Smith");

        await user.click(emailInput);
        await user.keyboard("example@email.com");

        await user.click(passwordInput);
        await user.keyboard("password");

        expect(screen.getByTestId("signUpButton")).toBeDisabled();
    });

    test("Sign Up Button should be disabled with Invalid Last Name", async () => {
        const emailInput = screen.getByTestId("emailInput");
        const passwordInput = screen.getByTestId("passwordInput");
        const firstNameInput = screen.getByTestId("firstNameInput");

        await user.click(firstNameInput);
        await user.keyboard("John");

        await user.click(emailInput);
        await user.keyboard("example@email.com");

        await user.click(passwordInput);
        await user.keyboard("password");

        expect(screen.getByTestId("signUpButton")).toBeDisabled();
    });

    test("Invalid Sign Up Attempt", async () => {
        server.use(
            rest.post(`${import.meta.env.VITE_API_URL}/api/user`, (req, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json<ResponseBody<string>>({
                        data: "An unexpected error occured. Please try again"
                    })
                );
            })
        );

        const emailInput = screen.getByTestId("emailInput");
        const passwordInput = screen.getByTestId("passwordInput");
        const firstNameInput = screen.getByTestId("firstNameInput");
        const lastNameInput = screen.getByTestId("lastNameInput");

        await user.click(firstNameInput);
        await user.keyboard("John");

        await user.click(lastNameInput);
        await user.keyboard("Smith");

        await user.click(emailInput);
        await user.keyboard("example@email.com");

        await user.click(passwordInput);
        await user.keyboard("P@ssword1234");

        const signUpButton = screen.getByTestId("signUpButton");

        expect(signUpButton).toBeEnabled();

        await user.click(signUpButton);

        expect(screen.getByRole("alert")).toBeInTheDocument();
    });
});