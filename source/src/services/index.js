import config from '../config/env.json';
import axios from 'axios';

export const api = axios.create({baseURL: config.API_URL});