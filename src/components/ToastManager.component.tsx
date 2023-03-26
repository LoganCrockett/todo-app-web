import { useState, useEffect } from "react";
import ToastProps, { ToastData } from "../models/components/ToastManager.model";
import { Outlet, useOutletContext } from "react-router-dom";

type ContextType = {
    addToast: (type: string, message: string, header?: string) => void
};

export const useToastManager = () => {
    return useOutletContext<ContextType>();
};

/**
 * Toast container component for displaying toast messages
 * @param props 
 */
const ToastManager = (props: any) => {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    const dismissToast = (toastIndex: number) => {
        setToasts((previousToasts) => {
            return previousToasts.filter((toast, index) => {
                return toastIndex !== index
            });;
        });
    };

    const addToast = (type: string, message: string, header?: string) => {
        setToasts((oldToasts) => {
            const newToasts = [
                ...oldToasts,
                {
                    type,
                    message,
                    header,
                    dismiss: dismissToast
                }
            ];
            return newToasts;
        });
    };

    const childContextProps: ContextType = {
        addToast
    };

    return (
        <>
            <Outlet context={childContextProps} />
            <div className="mb-4" style={{position: "fixed", bottom: "0px", right: "0px", marginRight: "10px"}}>
                {toasts.map((toast, index) => {
                    return <Toast key={`toast-${index}`} {...toast} index={index} />
                })}
            </div>
        </>
    )
};

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
                    onClick={() => props.dismiss(props.index)}
                    >
                    <span aria-hidden="true"></span>
                    </button>
                </div>
                <div className="toast-body">
                    {props.message}
                </div>
            </div>
        </>
    );
};

export default ToastManager;