export const testIds = {
    EVENT_FORM: 'event-form',
    TITLE_INPUT: 'title-input',
    SHORT_DESCRIPTION_INPUT: 'short-description-input',
    FULL_DESCRIPTION_INPUT: 'full-description-input',
    LOCATION_INPUT: 'location-input',
    EMAIL_INPUT: 'email-input',
    EVENT_DATE_INPUT: 'event-date-input',
    DISPLAY_ERROR_MESSAGE: 'display-error-message',
    DISPLAY_LOADING_MESSAGE: 'display-loading-message',
    DISPLAY_SUCCESS_MESSAGE: 'display-success-message',
    SUBMIT_BUTTON: 'submit-button',
};

// function to wrap test id for cypress to use with cy.get
export const testidSelector = (testId: string): string => `[data-testid="${testId}"]`;
