export type InputValues = {
    firstName: string;
    lastName: string;
    email: string;
    eventDate: string;
};

export type ValidationOutputError = {
    firstName?: string;
    lastName?: string;
    email?: string;
    eventDate?: string;
};
