import { body, ValidationError } from 'express-validator';

export enum eventsValidatorMessages {
    FIRST_NAME = 'First name should be non-empty string',
    LAST_NAME = 'Last name should be non-empty string',
    EMAIL = 'Email should be in format address@domain.com',
    EVENT_DATE = 'Date should be in format YYYY-MM-DD',
}

export const eventsValidator = [
    body('firstName', eventsValidatorMessages.FIRST_NAME).isString().notEmpty(),
    body('lastName', eventsValidatorMessages.LAST_NAME).isString().notEmpty(),
    body('email', eventsValidatorMessages.EMAIL).isEmail(),
    body('eventDate', eventsValidatorMessages.EVENT_DATE).exists().isDate().toDate(),
];

export const validatorErrorFormater = ({ msg }: ValidationError) => msg;
