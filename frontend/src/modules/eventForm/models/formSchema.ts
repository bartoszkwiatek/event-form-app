import { object, string, date } from 'yup';

export enum errorMessages {
    FIRST_NAME_REQUIRED = 'First name is required',
    LAST_NAME_REQUIRED = 'Last name is required',
    EMAIL_FORMAT = 'Check if email is in correct format',
    EMAIL_REQUIRED = 'Email is required',
    DATE_REQUIRED = 'Date is required',
}

//  using date() does not modify date, but checks whether it is possible to create date from that value
export const formSchema = object({
    firstName: string().required(errorMessages.FIRST_NAME_REQUIRED),
    lastName: string().required(errorMessages.LAST_NAME_REQUIRED),
    email: string().email(errorMessages.EMAIL_FORMAT).required(errorMessages.EMAIL_REQUIRED),
    eventDate: date().required(errorMessages.DATE_REQUIRED),
});
