export default interface LoginComponentState {
    email: string;
    password: string;
    isSubmitting: boolean;
    wasLoggedIn: boolean;
    isValidEmail: boolean;
    isValidPassword: boolean;
};