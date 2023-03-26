import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "../../routes/routes";

const renderRouter = (props: any) => {
    const router = createMemoryRouter(routes, {
        initialEntries: props.initialEntries
    });

    return render(<RouterProvider router={router} />);
};

export default renderRouter;