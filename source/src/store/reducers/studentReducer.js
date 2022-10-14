import { 
    STUDENT_ADDED,
    STUDENTS_LOADED,
    STUDENT_VALIDATED,
    NATIONALITIES_LOADED,
    STUDENT_LOADED_TO_EDITED,
} from "../actions/studentAction";

const familyType = {
    Sibling: 'Sibling',
    Parent: 'Parent',
    Spouse: 'Spouse',
}

const initialState = {
    familyTypes: Object.values(familyType),
    nationalities: [],
    families: [],
    students: [],
    editing: {},
};

export default function studentReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case STUDENT_ADDED:{
            const { student, fakeId } = payload;

            const updatedStudents = !fakeId
                ? [...state.students, student]
                : state.students.map((s, i) => (i === fakeId ? student : s));

            return {
                ...state,
                students: updatedStudents,
            };
        }

            case NATIONALITIES_LOADED:
                return {
                    ...state,
                    nationalities: payload,
                };

        case STUDENTS_LOADED:
            return {
                ...state,
                students: payload,
            };

        case STUDENT_VALIDATED:{
            return {
                ...state,
                students: state.students.map(s => (s.ID === payload.ID ? payload : s)),
            };
        }

        case STUDENT_LOADED_TO_EDITED:
            return {
                ...state,
                editing: {
                    fakeId: payload,
                    ...state.students[payload],
                },
            };

        default:
            return state;
    }
}