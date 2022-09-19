import { Form, Formik } from 'formik';
import { ReactElement, useState } from 'react';

import { DatePicker } from '../../../common/components/DatePicker';
import { TextInput } from '../../../common/components/TextInput';
import { formSchema } from '../models/formSchema';
import { InputValues, ValidationOutputError } from '../models/types';

export const EventForm = () => {
    const url = 'http://localhost:4000/events';

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | ValidationOutputError | Error>(null);
    const [success, setSuccess] = useState(false);

    const postForm = async (values: InputValues) => {
        setLoading(true);
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(values),
            // headers: {
            //     'Content-Type': 'application/json',
            // },
        });
        const responseData = await response.json();
        setLoading(false);
        if (response.status === 500 || response.status === 422) {
            setError(responseData);
            setSuccess(false);
        }
        if (response.status === 201) {
            setSuccess(true);
        }
        setLoading(false);
    };

    const clear = () => {
        setError(null);
        setSuccess(false);
    };

    const displayError = (error: ValidationOutputError | Error): ReactElement => {
        console.log(error instanceof Error);
        return <p>{JSON.stringify(error)}</p>;
    };

    return (
        <>
            {loading && <p>loading</p>}
            {!loading && <p>not loading</p>}
            {success && <p>Event saved</p>}
            {error && displayError(error)}
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    eventDate: '',
                }}
                validationSchema={formSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    await postForm(values);
                    setSubmitting(false);
                }}
            >
                <Form>
                    <TextInput
                        label="First name"
                        name="firstName"
                        type="text"
                        placeholder="First name"
                    />
                    <TextInput
                        label="Last name"
                        name="lastName"
                        type="text"
                        placeholder="Last name"
                    />
                    <TextInput
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="address@domain.com"
                    />
                    <DatePicker label="Event date" name="eventDate" />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    );
};
