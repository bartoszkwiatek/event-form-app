import { Form, Formik } from 'formik';
import { ReactElement, useState } from 'react';

import { useApi } from '../../../common/utils/useApi';
import { DatePicker } from '../../../common/components/DatePicker';
import { TextInput } from '../../../common/components/TextInput';
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
                    firstName: '',
                    lastName: '',
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
                                label="First name"
                                name="firstName"
                                type="text"
                                placeholder="First name"
                                data-testid="first-name-input"
                            />
                            <TextInput
                                label="Last name"
                                name="lastName"
                                type="text"
                                placeholder="Last name"
                                data-testid="last-name-input"
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
