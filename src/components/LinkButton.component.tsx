import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import LinkButtonProps from "../models/components/LinkButton.model";

const LinkButton = (props: LinkButtonProps) => {
    const navigate = useNavigate();

    const sendToRoute = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        navigate(props.to);
    };
    
    return (
        <>
            <button
            className={props.buttonClassName ? props.buttonClassName : "btn"}
            style={props.buttonStyle}
            role="button"
            onClick={sendToRoute}
            data-testid={props.testId}
            >
                {props.buttonText}
            </button>
        </>
    )
};

export default LinkButton;