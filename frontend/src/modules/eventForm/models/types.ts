export type InputValues = {
    title: string;
    shortDescription: string;
    fullDescription: string;
    location: string;
    email: string;
    eventDate: string;
};

export type CorrectFormResponse = InputValues & { id: string };

export type ValidationOutputError = Partial<InputValues>;
