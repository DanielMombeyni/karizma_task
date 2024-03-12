import { ToastContainer, toast } from 'react-toastify';

export const info = (message) => toast.info(`${message}`);
export const error = (message) => toast.error(`${message}`);
export const warning = (message) => toast.warning(`${message}`);
export const succuss = (message) => toast.success(`${message}`);