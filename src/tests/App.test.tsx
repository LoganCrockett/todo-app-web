import { render, screen } from "@testing-library/react"
import user from "@testing-library/user-event";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router-dom";
import routes from "../routes/routes";

describe("Testing Routing", () => {
    test("404 Not Found Route", () => {
        user.setup();

        const router = createMemoryRouter(routes, {
            initialEntries: ["/some-route-that-doesnt-exist"]
        });

        render(<RouterProvider router={router} />);

        expect(screen.getByTestId("notFoundDiv")).toBeInTheDocument();
    });

    test("Login Route", () => {
        user.setup();

        const router = createMemoryRouter(routes, {
            initialEntries: ["/login"]
        });

        render(<RouterProvider router={router} />);

        expect(screen.getByTestId("notFoundDiv")).toBeInTheDocument();
    });
});