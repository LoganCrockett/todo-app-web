import { useState, useEffect } from "react";
import ToastProps from "../../models/components/toastManager/ToastManager.model";
import "../../assets/styles/components/toastManager/Toast.style.css";

const Toast = (props: ToastProps) => {
    const defaultStyleString = "toast show mb-1";
    const [styleString, setStyleString] = useState(defaultStyleString);

    useEffect(() => {
        switch(props.type.toLowerCase()) {
            case "success": setStyleString(`${styleString} bg-success`); break;
            case "error": setStyleString(`${styleString} bg-danger`); break;
            default: setStyleString(defaultStyleString); break;
        }
    }, [props.type]);

    return (
        <>
            <div className={styleString} role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false">
                <div className="toast-header">
                    <strong className="me-auto">{props.header}</strong>
                    <button
                    type="button"
                    className="btn-close ms-2 mb-1"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                    style={{marginLeft: "auto"}}
                    onClick={() => props.dismiss(props.index)}
                    >
                    <span aria-hidden="true">
                        <svg width={16} height={16}>
                            <line x1={1} y1={1} x2={15} y2={15} style={{stroke: "rgb(0,0,0)", strokeWidth: "2"}} />
                            <line x1={15} y1={1} x2={1} y2={15} style={{stroke: "rgb(0,0,0)", strokeWidth: "2"}} />
                        </svg>
                    </span>
                    </button>
                </div>
                <div className="toast-body">
                    {props.message}
                </div>
            </div>
        </>
    );
};

export default Toast;