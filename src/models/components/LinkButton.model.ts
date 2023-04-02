import { CSSProperties } from "react";
import { To } from "react-router-dom";

export default interface LinkButtonProps {
    to: To;
    buttonText: string;
    testId?: string;
    buttonStyle?: CSSProperties;
    buttonClassName?: string;
}