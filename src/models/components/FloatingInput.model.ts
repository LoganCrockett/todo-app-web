import { ChangeEventHandler, InputHTMLAttributes } from "react";

export default interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
    testId?: string;
    handleChange: ChangeEventHandler;
    labelText: string;

    formClassName?: string;
    inputClassName?: string;
}