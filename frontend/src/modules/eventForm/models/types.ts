export type InputValues = {
    firstName: string;
    lastName: string;
    email: string;
    eventDate: string;
};

export type CorrectFormResponse = {
    firstName: string;
    lastName: string;
    email: string;
    eventDate: Date;
};

export type ValidationOutputError = {
    firstName?: string;
    lastName?: string;
    email?: string;
    eventDate?: string;
};
