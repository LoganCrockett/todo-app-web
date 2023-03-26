import { useState, useEffect } from "react";

/**
 * Stores an email value, and contains validation logic
 * @param defaultValue (optional) default email value
 */
const useEmail = (defaultValue?: string) => {
    const [email, setEmail] = useState(defaultValue ? defaultValue : "");
    const [isValidEmail, setIsValidEmail] = useState(false);

    useEffect(() => {
        setIsValidEmail(
            // Per RFC 2822 Guidelines
            // See https://regexr.com/2rhq7 for pattern
            email.match(/([A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]+)(?:\.*[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]*)@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)?.length === 1
        );
    }, [email]);

    return { email, setEmail, isValidEmail};
};

export default useEmail;