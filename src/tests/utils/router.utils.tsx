import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "../../pages/pages";

const renderRouter = (props: RenderRouterProps) => {
    const router = createMemoryRouter(routes, {
        initialEntries: props.initialEntries
    });

    return render(<RouterProvider router={router} />);
};

interface RenderRouterProps {
    initialEntries: any[]
};

export default renderRouter;