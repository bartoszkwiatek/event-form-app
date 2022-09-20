import { render, screen } from '@testing-library/react';

import { testIds } from '../common/testIds';
import { DisplayError } from '../../modules/eventForm/components/DisplayError';

describe('Test display error component with different props', () => {
    test('No error', () => {
        const error = null;
        render(<DisplayError error={error} />);

        const message = screen.queryAllByTestId(testIds.DISPLAY_ERROR_MESSAGE);

        expect(message).toHaveLength(0);
    });

    test('ValidationInputError', () => {
        const error = {
            firstName: 'first name error',
        };
        render(<DisplayError error={error} />);

        const message = screen.getAllByTestId(testIds.DISPLAY_ERROR_MESSAGE);
        expect(message).toHaveLength(1);
        expect(message[0]).toHaveTextContent(error.firstName);
    });

    test('ValidationInputError', () => {
        const error = {
            firstName: 'first name error',
            lastName: 'last name error',
        };
        render(<DisplayError error={error} />);

        const message = screen.getAllByTestId(testIds.DISPLAY_ERROR_MESSAGE);
        expect(message).toHaveLength(Object.keys(error).length);
    });

    test('Error', () => {
        const error = {
            errors: {
                eventDate: {
                    name: 'ValidatorError',
                    message: 'Path `eventDate` is required.',
                    properties: {
                        message: 'Path `eventDate` is required.',
                        type: 'required',
                        path: 'eventDate',
                        value: null,
                    },
                    kind: 'required',
                    path: 'eventDate',
                    value: null,
                },
            },
            _message: 'Events validation failed',
            name: 'ValidationError',
            message: 'Events validation failed: eventDate: Path `eventDate` is required.',
        };
        render(<DisplayError error={error} />);

        const message = screen.getAllByTestId(testIds.DISPLAY_ERROR_MESSAGE);

        expect(message).toHaveLength(1);
        expect(message[0]).toHaveTextContent(error.message);
    });
});
