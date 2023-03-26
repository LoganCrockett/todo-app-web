import { renderHook } from "@testing-library/react";
import useEmail from "../../hooks/useEmail.hook";

const invalidEmails = [
    "",
    "1234@.com",
    "asdf4233example.com",
    "@example.com",
    "example@example",
    "example@example."
];

describe("useEmail Tests", () => {
    test.each(invalidEmails)("Testing Invalid Emails", (email) => {
        const { result } = renderHook(() => useEmail(email));

        expect(result.current.isValidEmail).toBeFalsy();
    });

    test("Testing Valid Email", () => {
        const { result } = renderHook(() => useEmail("example@email.com"));

        expect(result.current.isValidEmail).toBeTruthy();
    });
});