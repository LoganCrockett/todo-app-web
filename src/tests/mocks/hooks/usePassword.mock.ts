import { vi } from "vitest";
import * as passwordHooks from "../../../hooks/usePassword.hook";

const usePasswordValidationSpy = vi.spyOn(passwordHooks, "usePasswordValidation");

export function mockUsePasswordValidation(shouldReturn: boolean) {
    usePasswordValidationSpy.mockImplementationOnce(() => {
        return { validLength: shouldReturn, hasUppercaseLetter: shouldReturn, hasLowercaseLetter: shouldReturn, hasSpecialCharacter: shouldReturn, hasNumber: shouldReturn }
    });
}