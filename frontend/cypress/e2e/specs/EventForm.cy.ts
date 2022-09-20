import { testIds, testidSelector } from '../../../src/modules/eventForm/__tests__/testIds';
import { errorMessages } from '../../../src/modules/eventForm/models/formSchema';

describe('Testing EventForm', () => {
    const correctData = {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'correct@email.com',
        eventDate: '1993-08-14',
    };

    beforeEach(() => {
        // go to base url
        cy.visit('');
    });

    // since we cannot rely on portlet to be there we need to create temporary one
    it('should check if form is visible', () => {
        cy.get(testidSelector(testIds.EVENT_FORM)).should('be.visible');
    });

    it('should correctly fill form and save data to server', () => {
        cy.intercept('POST', 'http://localhost:4000/events', req => {
            req.on('response', res => {
                // delay for response so 'submitting' phase is clearly visible
                res.setDelay(1000);
            });
        }).as('createEvent');

        cy.get(testidSelector(testIds.EVENT_FORM))
            .should('be.visible')
            .within(() => {
                cy.get(testidSelector(testIds.FIRST_NAME_INPUT))
                    .find('input')
                    .type(correctData.firstName);
                cy.get(testidSelector(testIds.LAST_NAME_INPUT))
                    .find('input')
                    .type(correctData.lastName);
                cy.get(testidSelector(testIds.EMAIL_INPUT)).find('input').type(correctData.email);
                cy.get(testidSelector(testIds.EVENT_DATE_INPUT))
                    .find('input')
                    .type(correctData.eventDate);
                cy.get(testidSelector(testIds.SUBMIT_BUTTON)).click();
                cy.get(testidSelector(testIds.DISPLAY_LOADING_MESSAGE)).should('be.visible');
            });

        cy.wait('@createEvent').its('request.body').should('deep.equal', correctData);
        cy.get(testidSelector(testIds.DISPLAY_SUCCESS_MESSAGE)).should('be.visible');
    });

    it('should display validation error after blurring input', () => {
        const incorrectEmail = 'asdf.com';
        cy.get(testidSelector(testIds.EVENT_FORM))
            .should('be.visible')
            .within(() => {
                cy.get(testidSelector(testIds.FIRST_NAME_INPUT)).find('input').focus().blur();
                cy.get(testidSelector(testIds.FIRST_NAME_INPUT))
                    .find('.error')
                    .should('be.visible')
                    .should('have.text', errorMessages.FIRST_NAME_REQUIRED);
                cy.get(testidSelector(testIds.LAST_NAME_INPUT)).find('input').focus().blur();
                cy.get(testidSelector(testIds.LAST_NAME_INPUT))
                    .find('.error')
                    .should('be.visible')
                    .should('have.text', errorMessages.LAST_NAME_REQUIRED);
                cy.get(testidSelector(testIds.EMAIL_INPUT)).find('input').focus().blur();
                cy.get(testidSelector(testIds.EMAIL_INPUT))
                    .find('.error')
                    .should('be.visible')
                    .should('have.text', errorMessages.EMAIL_REQUIRED);
                cy.get(testidSelector(testIds.EMAIL_INPUT)).find('input').type(incorrectEmail);
                cy.get(testidSelector(testIds.EMAIL_INPUT))
                    .find('.error')
                    .should('be.visible')
                    .should('have.text', errorMessages.EMAIL_FORMAT);
                cy.get(testidSelector(testIds.EVENT_DATE_INPUT)).find('input').focus().blur();
                cy.get(testidSelector(testIds.EVENT_DATE_INPUT))
                    .find('.error')
                    .should('be.visible')
                    .should('have.text', errorMessages.DATE_REQUIRED);
            });
    });
});
