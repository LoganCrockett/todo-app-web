import { getByTestId, render, screen } from "@testing-library/react"
import React from "react";
import App from "../App";

describe("Testing App Component", () => {
    test("Example Test with ViTest", () => {
        // For some reason, you have to create a functional component this way
        render(React.createElement(App));

        const testParagraph = screen.getByTestId("test-paragraph");

        expect(testParagraph).toBeInTheDocument();
    });
});