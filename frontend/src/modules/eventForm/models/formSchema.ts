import { object, string, date } from 'yup';

export const formSchema = object({
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    email: string().email('Check if email is in correct format').required('Email is required'),
    eventDate: date().required('Date is required'),
});
