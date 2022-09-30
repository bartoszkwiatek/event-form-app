import { object, string, date } from 'yup';

export enum errorMessages {
    TITLE_REQUIRED = 'Title is required',
    SHORT_DESCRIPTION_REQUIRED = 'Short description is required',
    FULL_DESCRIPTION_REQUIRED = 'Full description is required',
    EMAIL_FORMAT = 'Check if email is in correct format',
    EMAIL_REQUIRED = 'Email is required',
    LOCATION_REQUIRED = 'Location is required',
    DATE_REQUIRED = 'Date is required',
    TOO_SHORT = 'Input is too short',
    TOO_LONG = 'Input is too long',
}

//  using date() does not modify date, but checks whether it is possible to create date from that value
export const formSchema = object({
    title: string()
        .required(errorMessages.TITLE_REQUIRED)
        .min(8, errorMessages.TOO_SHORT)
        .max(64, errorMessages.TOO_LONG),
    shortDescription: string()
        .required(errorMessages.SHORT_DESCRIPTION_REQUIRED)
        .min(8, errorMessages.TOO_SHORT)
        .max(256, errorMessages.TOO_LONG),
    fullDescription: string()
        .required(errorMessages.FULL_DESCRIPTION_REQUIRED)
        .min(8, errorMessages.TOO_SHORT)
        .max(4096, errorMessages.TOO_LONG),
    location: string()
        .required(errorMessages.LOCATION_REQUIRED)
        .min(8, errorMessages.TOO_SHORT)
        .max(64, errorMessages.TOO_LONG),
    email: string().email(errorMessages.EMAIL_FORMAT).required(errorMessages.EMAIL_REQUIRED),
    eventDate: date().required(errorMessages.DATE_REQUIRED),
});
