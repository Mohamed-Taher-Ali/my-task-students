import { api } from "./";

export const loadStudentsService = () => (
    api.get(`/Students/`)
);

export const addStudentService = (studentData) => (
    api.post(`/Students/`, studentData)
);

export const updateStudentNationalityService = (stdId, natId) => (
    api.put(`/Students/${stdId}/Nationality/${natId}`)
);

export const getStudentNationalityService = (stdId) => (
    api.get(`/Students/${stdId}/Nationality/`)
);

export const updateStudentService = (stdId, data) => (
    api.put(`/Students/${stdId}`, data)
);
