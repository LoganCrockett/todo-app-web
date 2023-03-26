/**
 * For storing toast data in an array
 */
export interface ToastData {
        message: string;
        type: string;
        header?: string;
        dismiss: Function;
};

/**
 * Props passed to the Toast component
 */
export default interface ToastProps extends ToastData {
        index: number;
        message: string;
        type: string;
        header?: string;
        dismiss: Function;
};