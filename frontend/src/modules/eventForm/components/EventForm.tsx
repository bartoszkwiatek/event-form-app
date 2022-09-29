import { Form, Formik } from 'formik';
import { ReactElement, useState } from 'react';

import { DatePicker } from '../../../common/components/DatePicker';
import { TextInput } from '../../../common/components/TextInput';
import { formSchema } from '../models/formSchema';
import { InputValues, ValidationOutputError } from '../models/types';
import { DisplayError } from './DisplayError';
import { DisplayLoading } from './DisplayLoading';
import { DisplaySuccess } from './DisplaySuccess';
import './EventForm.scss';

const url = 'http://localhost:4000/events';

export const EventForm = (): ReactElement => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | ValidationOutputError | Error>(null);
    const [success, setSuccess] = useState(false);

    const postForm = async (values: InputValues): Promise<boolean> => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
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
        } catch {
            setLoading(false);
            setError(new Error('Unknown error'));
        }
        return false;
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
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    const success = await postForm(values);
                    setSubmitting(false);
                    if (success) resetForm();
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
            <DisplayLoading loading={loading} />
            <DisplayError error={error} />
            <DisplaySuccess success={success} />
        </div>
    );
};
