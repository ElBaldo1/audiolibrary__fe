import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ?? '';

/**
 * Axios instance configured for the AudioLibrary backend.
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
