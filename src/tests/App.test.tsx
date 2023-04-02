import { screen } from "@testing-library/react"
import renderRouter from "./utils/router.utils";

describe("Testing Routing", () => {
    test("404 Not Found Route", () => {
        renderRouter({ initialEntries: ["/some-route-that-doesnt-exist"] });

        expect(screen.getByTestId("notFoundDiv")).toBeInTheDocument();
    });

    test("Login Route", () => {
        renderRouter({ initialEntries: ["/"] });

        expect(screen.getByTestId("loginComponentId")).toBeInTheDocument();
    });

    test("Sign Up Route", () => {
        renderRouter({ initialEntries: ["/signUp"] });

        expect(screen.getByTestId("signUpPageContainer")).toBeInTheDocument();
    });

    test("Home Route", () => {
        renderRouter({ initialEntries: ["/home"] });

        expect(screen.getByTestId("homePageContainer")).toBeInTheDocument();
    });
});