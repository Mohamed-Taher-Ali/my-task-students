import { roles } from "../store/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";


export default function useGlobalState() {
    const state = useSelector(s=>s);
    const dispatch = useDispatch();
    const isRegisterer = state.auth.selectedRole === roles.Registerer;

    return {
        state,
        isRegisterer,
        dispatch,
    };
}