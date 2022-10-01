import { Form, Formik } from 'formik';
import { ReactElement, useState } from 'react';

import { useApi } from '../../../common/utils/useApi';
import { DatePicker } from '../../../common/components/DatePicker';
import { TextInput } from '../../../common/components/TextInput';
import { TextArea } from '../../../common/components/TextArea';
import { formSchema } from '../models/formSchema';
import { CorrectFormResponse, InputValues } from '../models/types';
import { DisplayError } from './DisplayError';
import { DisplayLoading } from './DisplayLoading';
import { DisplaySuccess } from './DisplaySuccess';
import './EventForm.scss';

const url = new URL('http://localhost:4000/events');

export const EventForm = (): ReactElement => {
    const [body, setBody] = useState<RequestInit | null>(null);
    const { data, isLoading, error } = useApi<CorrectFormResponse>(url, body);

    const handleSubmit = (values: InputValues) => {
        setBody({
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    return (
        <div className="event-form" data-testid="event-form">
            <h2 className="event-form-title">Create event</h2>
            <Formik
                initialValues={{
                    id: '',
                    title: '',
                    shortDescription: '',
                    fullDescription: '',
                    location: '',
                    email: '',
                    eventDate: '',
                }}
                validationSchema={formSchema}
                onSubmit={async values => {
                    handleSubmit(values);
                }}
            >
                {formik => {
                    const { dirty, isValid } = formik;
                    return (
                        <Form>
                            <TextInput
                                label="Event title"
                                name="title"
                                type="text"
                                placeholder="Event title"
                                data-testid="title-input"
                            />
                            <TextArea
                                label="Short description"
                                name="shortDescription"
                                placeholder="Short description"
                                data-testid="short-description-input"
                            />
                            <TextArea
                                label="Full description"
                                name="fullDescription"
                                placeholder="Full description"
                                data-testid="full-description-input"
                            />
                            <TextInput
                                label="Location"
                                name="location"
                                type="text"
                                placeholder="Event location"
                                data-testid="location-input"
                            />
                            <TextInput
                                label="Email address"
                                name="email"
                                type="email"
                                placeholder="address@domain.com"
                                data-testid="email-input"
                            />
                            <DatePicker
                                label="Event date"
                                name="eventDate"
                                data-testid="event-date-input"
                            />
                            <div className="button-container">
                                <button
                                    type="submit"
                                    data-testid="submit-button"
                                    disabled={!dirty || !isValid}
                                >
                                    Submit
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
            <DisplayLoading loading={isLoading} />
            <DisplayError error={error} />
            <DisplaySuccess success={!!data} />
        </div>
    );
};
