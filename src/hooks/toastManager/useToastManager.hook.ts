import { useOutletContext } from "react-router-dom";
import { ContextType } from "../../models/components/toastManager/ContextType.model";

const useToastManager = () => {
    return useOutletContext<ContextType>();
};

export default useToastManager;