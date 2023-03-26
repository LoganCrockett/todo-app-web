import { renderHook } from "@testing-library/react";
import usePassword, { usePasswordValidation } from "../../hooks/usePassword";

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
];

describe("usePassword Tests", () => {
    test.each(invalidPasswords)("Testing Invalid Passwords", (data) => {
        const { result } = renderHook(() => usePassword(data));
    
        expect(result.current.isValidPassword).toBeFalsy();
    });
    
    test("Testing Valid Password", () => {
        const { result } = renderHook(() => usePassword("P@ssword1234"));
    
        expect(result.current.isValidPassword).toBeTruthy();
    });
});

const passwordLengthTestData = [
    {
        password: "",
        expected: false
    },
    {
        password: "pa",
        expected: false
    },
    {
        password: "^Pss",
        expected: false
    },
    {
        password: "password",
        expected: true
    },
    {
        password: "12345678",
        expected: true
    },
    {
        password: "passwordpassword",
        expected: true
    }
];

const passwordUppercaseLetterTestData = [
    {
        password: "",
        expected: false
    },
    {
        password: "pa",
        expected: false
    },
    {
        password: "^Pss",
        expected: true
    },
    {
        password: "password",
        expected: false
    },
    {
        password: "12345678",
        expected: false
    },
    {
        password: "passwordpassword",
        expected: false
    }
];

const passwordLowercaseLetterTestData = [
    {
        password: "",
        expected: false
    },
    {
        password: "pa",
        expected: true
    },
    {
        password: "^Pss",
        expected: true
    },
    {
        password: "password",
        expected: true
    },
    {
        password: "12345678",
        expected: false
    },
    {
        password: "passwordpassword",
        expected: true
    }
];

const passwordSpecialCharacterTestData = [
    {
        password: "",
        expected: false
    },
    {
        password: "pa",
        expected: false
    },
    {
        password: "^Pss",
        expected: true
    },
    {
        password: "password",
        expected: false
    },
    {
        password: "12345678",
        expected: false
    },
    {
        password: "passwordpassword",
        expected: false
    },
    {
        password: "P@ssword",
        expected: true
    }
];

const passwordNumberTestData = [
    {
        password: "",
        expected: false
    },
    {
        password: "pa",
        expected: false
    },
    {
        password: "^Pss",
        expected: false
    },
    {
        password: "password",
        expected: false
    },
    {
        password: "12345678",
        expected: true
    },
    {
        password: "passwordpassword",
        expected: false
    },
    {
        password: "P@ssword",
        expected: false
    },
    {
        password: "P@ssword22",
        expected: true
    }
];

describe("usePasswordValidation Tests", () => {
    test.each(passwordLengthTestData)("Password length check", (data) => {
        const { result } = renderHook(() => usePasswordValidation(data.password));

        expect(result.current.validLength).toEqual(data.expected);
    });

    test.each(passwordUppercaseLetterTestData)("Password Uppercase letter check", (data) => {
        const { result } = renderHook(() => usePasswordValidation(data.password));

        expect(result.current.hasUppercaseLetter).toEqual(data.expected);
    });

    test.each(passwordLowercaseLetterTestData)("Password Lowercase letter check", (data) => {
        const { result } = renderHook(() => usePasswordValidation(data.password));

        expect(result.current.hasLowercaseLetter).toEqual(data.expected);
    });

    test.each(passwordSpecialCharacterTestData)("Password Special Character check", (data) => {
        const { result } = renderHook(() => usePasswordValidation(data.password));

        expect(result.current.hasSpecialCharacter).toEqual(data.expected);
    });

    test.each(passwordNumberTestData)("Password Number check", (data) => {
        const { result } = renderHook(() => usePasswordValidation(data.password));

        expect(result.current.hasNumber).toEqual(data.expected);
    });
});