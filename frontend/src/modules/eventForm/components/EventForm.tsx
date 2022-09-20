import { Form, Formik } from 'formik';
import { ReactElement, useState } from 'react';

import { DatePicker } from '../../../common/components/DatePicker';
import { TextInput } from '../../../common/components/TextInput';
import { formSchema } from '../models/formSchema';
import { InputValues, ValidationOutputError } from '../models/types';
import { DisplayError } from './DisplayError';
import { DisplayLoading } from './DisplayLoading';
import { DisplaySuccess } from './DisplaySuccess';

const url = 'http://localhost:4000/events';

export const EventForm = (): ReactElement => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | ValidationOutputError | Error>(null);
    const [success, setSuccess] = useState(false);

    const postForm = async (values: InputValues): Promise<boolean> => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const responseData = await response.json();
        setLoading(false);
        if (response.status === 500 || response.status === 422) {
            setError(responseData);
            return false;
        }
        if (response.status === 201) {
            setSuccess(true);
            return true;
        }
        return false;
    };

    return (
        <div className="event-form" data-testid="event-form">
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    eventDate: '',
                }}
                validationSchema={formSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    const success = await postForm(values);

                    setSubmitting(false);
                    if (success) resetForm();
                }}
            >
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

                    <button type="submit" data-testid="submit-button">
                        Submit
                    </button>
                </Form>
            </Formik>
            <DisplayLoading loading={loading} />
            <DisplayError error={error} />
            <DisplaySuccess success={success} />
        </div>
    );
};
