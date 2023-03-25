import { useToastManager } from "../components/ToastManager";

const SignUp = (props: any) => {
    const context = useToastManager();
    
    return (
        <>
            <div data-testid="signUpPageContainer">
                <p>Sign Up Page Works</p>
            </div>
        </>
    );
};

export default SignUp;