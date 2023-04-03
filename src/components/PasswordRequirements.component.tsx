import { usePasswordValidation } from "../hooks/usePassword.hook";

const PasswordRequirements = ({ password }: PasswordRequirementsComponentProps) => {
    const {validLength, hasUppercaseLetter, hasLowercaseLetter, hasSpecialCharacter, hasNumber} = usePasswordValidation(password);
    return (
        <div>
            <h5>Your password must:</h5>
            <ul style={{listStyle: "outside none '- '"}}>
                <li data-testid="minimumLengthItem" className={validLength ? "text-valid" : "text-invalid"}>
                    <p>Be a minimum of 8 characters in length</p>
                </li>
                <li data-testid="uppercaseLetterItem" className={hasUppercaseLetter ? "text-valid" : "text-invalid"}>
                    <p>Contain at least one uppercase letter</p>
                </li>
                <li data-testid="lowercaseLetterItem" className={hasLowercaseLetter ? "text-valid" : "text-invalid"}>
                    <p>Contain at least one lowercase letter</p>
                </li>
                <li data-testid="specialCharacterItem" className={hasSpecialCharacter ? "text-valid" : "text-invalid"}>
                    {/* See https://symbl.cc/en/html-entities/ for list of symbols and appropriate codes */}
                    <p>Contain at least one of the following special characters: !"#$%&' &#40;&#41;*+,-./:;&lt;=&gt;?@[\]^_&#96;&#123;&#124;&#125;~</p>
                </li>
                <li data-testid="numberItem" className={hasNumber ? "text-valid" : "text-invalid"}>
                    <p>Contain at least one number</p>
                </li>
            </ul>
        </div>
    );
};

interface PasswordRequirementsComponentProps {
    password: string;
}

export default PasswordRequirements;