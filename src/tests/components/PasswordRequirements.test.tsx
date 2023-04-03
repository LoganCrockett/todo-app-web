import { render, screen } from "@testing-library/react"
import PasswordRequirements from "../../components/PasswordRequirements.component"
import { vi } from "vitest";
import { mockUsePasswordValidation } from "../mocks/hooks/usePassword.mock";

afterEach(() => {
    vi.restoreAllMocks();
});

describe("Password Requirements Component Valid Tests", () => {
    beforeEach(() => {
        mockUsePasswordValidation(true);
    });

    test("8 Character Minimum Length", () => {
        render(<PasswordRequirements password={"password"} />);

        expect(screen.getByTestId("minimumLengthItem")).toHaveClass("text-valid");
    });

    test("Uppercase Letter Check", () => {
        render(<PasswordRequirements password={"Password"} />);

        expect(screen.getByTestId("uppercaseLetterItem")).toHaveClass("text-valid");
    });

    test("Lowercase Letter Check", () => {
        render(<PasswordRequirements password={"Password"} />);

        expect(screen.getByTestId("lowercaseLetterItem")).toHaveClass("text-valid");
    });

    test("Special Character Check", () => {
        render(<PasswordRequirements password={"P@ssword"} />);

        expect(screen.getByTestId("specialCharacterItem")).toHaveClass("text-valid");
    });

    test("Number Check", () => {
        render(<PasswordRequirements password={"Password1"} />);

        expect(screen.getByTestId("numberItem")).toHaveClass("text-valid");
    });
});

describe("Password Requirements Component Invalid Tests", () => {
    beforeEach(() => {
        mockUsePasswordValidation(false);
    });

    test("8 Character Minimum Length", () => {
        render(<PasswordRequirements password={"passwo"} />);

        expect(screen.getByTestId("minimumLengthItem")).toHaveClass("text-invalid");
    });

    test("Uppercase Letter Check", () => {
        render(<PasswordRequirements password={"password"} />);

        expect(screen.getByTestId("uppercaseLetterItem")).toHaveClass("text-invalid");
    });

    test("Lowercase Letter Check", () => {
        render(<PasswordRequirements password={"PASSWORD"} />);

        expect(screen.getByTestId("lowercaseLetterItem")).toHaveClass("text-invalid");
    });

    test("Special Character Check", () => {
        render(<PasswordRequirements password={"Password"} />);

        expect(screen.getByTestId("specialCharacterItem")).toHaveClass("text-invalid");
    });

    test("Number Check", () => {
        render(<PasswordRequirements password={"Password"} />);

        expect(screen.getByTestId("numberItem")).toHaveClass("text-invalid");
    });
});