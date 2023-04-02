import FloatingInputProps from "../models/components/FloatingInput.model";
import "../assets/styles/components/FloatingInput.style.css";

const FloatingInput = (props: FloatingInputProps) => {
    return (
        <>
            <div className={props.formClassName ? props.formClassName : "floating-form"} >
                <input
                type={props.type}
                className={props.inputClassName ? props.inputClassName : "floating-input"}
                id={props.id}
                data-testid={props.testId}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.handleChange} />
                <label htmlFor={props.id}>{props.labelText}</label>
            </div>
        </>
    );
};

export default FloatingInput;