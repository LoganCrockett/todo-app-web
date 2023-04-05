import { useState } from "react";
import { ToastData } from "../../models/components/toastManager/ToastManager.model";
import { Outlet } from "react-router-dom";
import Toast from "./Toast.component";
import { ContextType } from "../../models/components/toastManager/ContextType.model";
import "../../assets/styles/components/toastManager/ToastManager.style.css";
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
            <div className="mb-4" id="toastContainer">
                {toasts.map((toast, index) => {
                    return <Toast key={`toast-${index}`} {...toast} index={index} />
                })}
            </div>
        </>
    )
};

export default ToastManager;