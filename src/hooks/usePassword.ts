import { useEffect, useState } from "react";

/**
 * Stores and updates a password value, and contains validation logic
 * @param defaultValue (optional) default password value
 */
const usePassword = (defaultValue?: string) => {
    const [password, setPassword] = useState(defaultValue ? defaultValue : "");
    // const [isValidPassword, setIsValidPassword] = useState(false);
    const { validLength, hasUppercaseLetter, hasLowercaseLetter, hasSpecialCharacter, hasNumber} = usePasswordValidation(password);

    /*
     * Commenting out, since this regex will match the entire password, instead of portions
     */
    // useEffect(() => {
    //     setIsValidPassword(
    //         password.match(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,}$/gm)?.length === 1
    //     );
    // }, [password])

    return { password, setPassword, isValidPassword: validLength && hasUppercaseLetter && hasLowercaseLetter && hasSpecialCharacter && hasNumber };
};

/**
 * Checks passowrd for a valid value based on:
 * At least One Uppercase letter
 * At least One lower case letter
 * At least One special Character (See here:https://owasp.org/www-community/password-special-characters)
 * At least One Number
 * @param password password to check
 */
export const usePasswordValidation = (password: string) => {
    const [passwordLengthCheck, setPasswordLengthCheck] = useState(false);
    const [uppercaseLetterCheck, setUppercaseLetterCheck] = useState(false);
    const [lowercaseLetterCheck, setLowercaseLetterCheck] = useState(false);
    const [specialCharacterCheck, setSpecialCharacterCheck] = useState(false);
    const [numberCheck, setNumberCheck] = useState(false);

    useEffect(() => {
        setPasswordLengthCheck(password.length > 7);
        setUppercaseLetterCheck((password.match(/[A-Z]{1,}/g) ?? []).length > 0);
        setLowercaseLetterCheck((password.match(/[a-z]{1,}/g) ?? []).length > 0);
        setSpecialCharacterCheck((password.match(/[ !"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]{1,}/g) ?? []).length > 0);
        setNumberCheck((password.match(/[0-9]{1,}/g) ?? []).length > 0);
        
    }, [password]);

    return { validLength: passwordLengthCheck, hasUppercaseLetter: uppercaseLetterCheck,
        hasLowercaseLetter: lowercaseLetterCheck, hasSpecialCharacter: specialCharacterCheck, hasNumber: numberCheck };
}

export default usePassword;