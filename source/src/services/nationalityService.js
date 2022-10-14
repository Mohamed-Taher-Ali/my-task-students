import { api } from "./";

export const loadNationalitiesService = () => (
    api.get(`/Nationalities/`)
);