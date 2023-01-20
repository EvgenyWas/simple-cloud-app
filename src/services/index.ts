import FileSharingService from './FileSharingService';

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const API_SECRET = import.meta.env.VITE_APP_API_SECRET;

export const fileSharing = new FileSharingService(API_KEY, API_SECRET);
