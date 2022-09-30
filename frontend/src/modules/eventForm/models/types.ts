export type InputValues = {
    id: string;
    title: string;
    shortDescription: string;
    fullDescritption: string;
    location: string;
    email: string;
    eventDate: string;
};

export type CorrectFormResponse = InputValues & {
    eventDate: Date;
};

export type ValidationOutputError = Partial<InputValues>;
