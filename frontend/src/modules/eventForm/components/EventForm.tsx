import { Form, Formik } from 'formik';
import { ReactElement, useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import { useApi } from '../../../common/utils/useApi';
import { DatePicker } from '../../../common/components/DatePicker';
import { TextInput } from '../../../common/components/TextInput';
import { TextArea } from '../../../common/components/TextArea';
import { formSchema } from '../models/formSchema';
import { CorrectFormResponse, InputValues } from '../models/types';
import { DisplayError } from './DisplayError';
import { DisplayLoading } from './DisplayLoading';
import { DisplaySuccess } from './DisplaySuccess';

const url = new URL('http://localhost:4000/events');

// eslint-disable-next-line max-lines-per-function
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
        <Container className="event-form" data-testid="event-form" maxWidth="md">
            <Typography className="event-form-title" variant="h4" component="h3">
                Create event
            </Typography>
            <Formik
                initialValues={{
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
                            <Grid container columnSpacing={2} columns={{ xs: 1, md: 2 }}>
                                <Grid item xs={1}>
                                    <TextInput
                                        label="Event title"
                                        name="title"
                                        type="text"
                                        placeholder="Event title"
                                        data-testid="title-input"
                                    />
                                </Grid>
                                <Grid item xs={1} md={2}>
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
                                </Grid>
                                <Grid item xs={1}>
                                    <TextInput
                                        label="Location"
                                        name="location"
                                        type="text"
                                        placeholder="Event location"
                                        data-testid="location-input"
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <DatePicker
                                        label="Event date"
                                        name="eventDate"
                                        data-testid="event-date-input"
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <TextInput
                                        label="Email address"
                                        name="email"
                                        type="email"
                                        placeholder="address@domain.com"
                                        data-testid="email-input"
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <Stack
                                        // justifyContent="center"
                                        spacing={2}
                                        direction="row"
                                        marginTop={2}
                                        marginBottom={2}
                                    >
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            disableElevation
                                            type="reset"
                                            data-testid="reset-button"
                                        >
                                            reset
                                        </Button>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            disableElevation
                                            type="submit"
                                            data-testid="submit-button"
                                            disabled={!dirty || !isValid}
                                        >
                                            Submit
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
            <DisplayLoading loading={isLoading} />
            <DisplayError error={error} />
            <DisplaySuccess success={!!data} />
        </Container>
    );
};
