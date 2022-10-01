export type InputValues = {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    location: string;
    email: string;
    eventDate: string;
};

export type CorrectFormResponse = InputValues;

export type ValidationOutputError = Partial<InputValues>;
