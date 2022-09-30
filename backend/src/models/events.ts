import mongoose from 'mongoose';

export interface IEvent extends mongoose.Document {
    title: string;
    shortDescription: string;
    fullDescription: string;
    email: string;
    location: string;
    eventDate: Date;
}

const eventsSchema = new mongoose.Schema<IEvent>(
    {
        title: {
            type: String,
            required: true,
        },
        shortDescription: {
            type: String,
            required: true,
        },
        fullDescription: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        eventDate: {
            type: Date,
            required: true,
        },
    },
    { collection: 'events', timestamps: true },
);

const EventsModel = mongoose.model<IEvent>('Events', eventsSchema);

export default EventsModel;
