export const testIds = {
    EVENT_FORM: 'event-form',
    FIRST_NAME_INPUT: 'first-name-input',
    LAST_NAME_INPUT: 'last-name-input',
    EMAIL_INPUT: 'email-input',
    EVENT_DATE_INPUT: 'event-date-input',
    DISPLAY_ERROR_MESSAGE: 'display-error-message',
    DISPLAY_LOADING_MESSAGE: 'display-loading-message',
    DISPLAY_SUCCESS_MESSAGE: 'display-success-message',
    SUBMIT_BUTTON: 'submit-button',
};

// function to wrap test id for cypress to use with cy.get
export const testidSelector = (testId: string): string => `[data-testid="${testId}"]`;
