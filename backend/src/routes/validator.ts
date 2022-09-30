import { body, ValidationError } from 'express-validator';

export enum eventsValidatorMessages {
    TITLE = 'Title should string 8-64 characters',
    SHORT_DESCRIPTION = 'Short description should be string 8-256 characters',
    FULL_DESCRIPTION = 'Short description should be string 8-4096 characters',
    LOCATION = 'Location should be string 8-64 characters',
    EMAIL = 'Email should be in format address@domain.com',
    EVENT_DATE = 'Date should be in format YYYY-MM-DD',
}

export const eventsValidator = [
    body('title', eventsValidatorMessages.TITLE).isString().isLength({ min: 8, max: 64 }),
    body('shortDescription', eventsValidatorMessages.SHORT_DESCRIPTION)
        .isString()
        .isLength({ min: 8, max: 256 }),
    body('fullDescription', eventsValidatorMessages.FULL_DESCRIPTION)
        .isString()
        .isLength({ min: 8, max: 4096 }),
    body('location', eventsValidatorMessages.LOCATION).isString().isLength({ min: 8, max: 64 }),
    body('email', eventsValidatorMessages.EMAIL).isEmail(),
    body('eventDate', eventsValidatorMessages.EVENT_DATE).exists().isDate().toDate(),
];

export const validatorErrorFormater = ({ msg }: ValidationError) => msg;
