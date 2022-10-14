import { ROLE_SELECTED } from "../actions/authAction";

export const roles = {
    Admin: 'Admin',
    Registerer: 'Registerer',
}

const initialState = {
    selectedRole: roles.Admin,
    roles: Object.values(roles),
};

export default function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ROLE_SELECTED:
            return {
                ...state,
                selectedRole: payload,
            };
        default:
            return state;
    }
}