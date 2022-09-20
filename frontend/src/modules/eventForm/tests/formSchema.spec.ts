import { formSchema, errorMessages } from '../models/formSchema';

describe('Client form validation', () => {
    it('Should be valid', () => {
        const correctData = {
            firstName: 'First name',
            lastName: 'Last name',
            email: 'correct@email.com',
            eventDate: '1993-08-14',
        };

        expect(formSchema.isValidSync(correctData)).toEqual(true);
    });

    it('Should not be valid and throw first name required error', () => {
        const incorrectData = {
            lastName: 'Last name',
            email: 'correct@email.com',
            eventDate: '1993-08-14',
        };

        expect(formSchema.isValidSync(incorrectData)).toEqual(false);
        expect(() => formSchema.validateSync(incorrectData)).toThrowError(
            errorMessages.FIRST_NAME_REQUIRED,
        );
    });
    it('Should not be valid and throw last name required error', () => {
        const incorrectData = {
            firstName: 'First name',
            email: 'correct@email.com',
            eventDate: '1993-08-14',
        };

        expect(formSchema.isValidSync(incorrectData)).toEqual(false);
        expect(() => formSchema.validateSync(incorrectData)).toThrowError(
            errorMessages.LAST_NAME_REQUIRED,
        );
    });
    it('Should not be valid and throw email required error', () => {
        const incorrectData = {
            firstName: 'First name',
            lastName: 'Last name',
            eventDate: '1993-08-14',
        };

        expect(formSchema.isValidSync(incorrectData)).toEqual(false);
        expect(() => formSchema.validateSync(incorrectData)).toThrowError(
            errorMessages.EMAIL_REQUIRED,
        );
    });
    it('Should not be valid and throw email format error', () => {
        const incorrectData = {
            firstName: 'First name',
            lastName: 'Last name',
            email: 'incorrectemail.com',
            eventDate: '1993-08-14',
        };

        expect(formSchema.isValidSync(incorrectData)).toEqual(false);
        expect(() => formSchema.validateSync(incorrectData)).toThrowError(
            errorMessages.EMAIL_FORMAT,
        );
    });

    it('Should not be valid and throw date required error', () => {
        const incorrectData = {
            firstName: 'First name',
            lastName: 'Last name',
            email: 'correct@email.com',
        };

        expect(formSchema.isValidSync(incorrectData)).toEqual(false);
        expect(() => formSchema.validateSync(incorrectData)).toThrowError(
            errorMessages.DATE_REQUIRED,
        );
    });

    it('Should not be valid and throw date required error', () => {
        const incorrectData = {
            firstName: 'First name',
            lastName: 'Last name',
            email: 'correct@email.com',
            eventDate: '1993534-08-14',
        };

        expect(formSchema.isValidSync(incorrectData)).toEqual(false);

        // date() in formSchema schema has it's own error
        expect(() => formSchema.validateSync(incorrectData)).toThrowError(
            'eventDate must be a `date` type',
        );
    });
});
