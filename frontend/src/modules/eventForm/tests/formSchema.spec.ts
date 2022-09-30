import { formSchema, errorMessages } from '../models/formSchema';

describe('Client form validation', () => {
    const correctData = {
        title: 'Event title',
        shortDescription: 'Short desc',
        fullDescription: 'Full description it is',
        email: 'email@email.com',
        location: 'Online event',
        eventDate: '1993-08-14',
    };

    it('Should be valid', () => {
        expect(formSchema.isValidSync(correctData)).toEqual(true);
    });

    it('Should not be valid and throw title required error', () => {
        const incorrectData = {
            ...correctData,
            title: undefined,
        };

        expect(formSchema.isValidSync(incorrectData)).toEqual(false);
        expect(() => formSchema.validateSync(incorrectData)).toThrowError(
            errorMessages.TITLE_REQUIRED,
        );
    });
    it('Should not be valid and throw short desc required error', () => {
        const incorrectData = {
            ...correctData,
            shortDescription: undefined,
        };
        expect(formSchema.isValidSync(incorrectData)).toEqual(false);
        expect(() => formSchema.validateSync(incorrectData)).toThrowError(
            errorMessages.SHORT_DESCRIPTION_REQUIRED,
        );
    });

    it('Should not be valid and throw too short error', () => {
        const incorrectData = {
            ...correctData,
            fullDescription: 'short',
        };

        expect(formSchema.isValidSync(incorrectData)).toEqual(false);
        expect(() => formSchema.validateSync(incorrectData)).toThrowError(errorMessages.TOO_SHORT);
    });
    it('Should not be valid and throw email format error', () => {
        const incorrectData = {
            ...correctData,
            email: 'aasdf.asdf',
        };

        expect(formSchema.isValidSync(incorrectData)).toEqual(false);
        expect(() => formSchema.validateSync(incorrectData)).toThrowError(
            errorMessages.EMAIL_FORMAT,
        );
    });

    it('Should not be valid and throw date required error', () => {
        const incorrectData = {
            ...correctData,
            eventDate: '1993534-08-14',
        };

        expect(formSchema.isValidSync(incorrectData)).toEqual(false);

        // date() in formSchema schema has it's own error
        expect(() => formSchema.validateSync(incorrectData)).toThrowError(
            'eventDate must be a `date` type',
        );
    });
});
