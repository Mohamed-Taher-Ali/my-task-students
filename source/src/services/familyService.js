import { api } from "./";

export const addFamilyMemberService = (stdId, data) => (
    api.post(`/Students/${stdId}/FamilyMembers/`, data)
);

export const getFamilyMembersService = (stdId) => (
    api.get(`/Students/${stdId}/FamilyMembers/`)
);

export const updateFamilyMemberService = (memberId) => (
    api.put(`/FamilyMembers/${memberId}`)
);

export const deleteFamilyMemberService = (memberId) => (
    api.delete(`/FamilyMembers/${memberId}`)
);

export const updateFamilyMemberNationalityService = (memberId, natId) => (
    api.put(`/FamilyMembers/${memberId}/Nationality/${natId}`)
);

export const deleteFamilyMemberNationalityService = (memberId, natId) => (
    api.put(`/FamilyMembers/${memberId}/Nationality/${natId}`)
);