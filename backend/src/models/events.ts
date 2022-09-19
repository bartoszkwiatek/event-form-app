import mongoose from 'mongoose';

export interface IEvent extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    eventDate: Date;
}

const eventsSchema = new mongoose.Schema<IEvent>(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
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
