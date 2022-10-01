import { testIds, testidSelector } from '../../../src/modules/eventForm/tests/testIds';
import { errorMessages } from '../../../src/modules/eventForm/models/formSchema';

describe('Testing EventForm', () => {
    const correctData = {
        title: 'Event title',
        shortDescription: 'Short desc',
        fullDescription: 'Full description it is',
        email: 'email@email.com',
        location: 'Online event',
        eventDate: '140819931413',
    };

    const responseDate = '1993-08-14T12:13:00.000Z';

    beforeEach(() => {
        // go to base url
        cy.visit('create');
    });

    // since we cannot rely on portlet to be there we need to create temporary one
    it('should check if form is visible', () => {
        cy.get(testidSelector(testIds.EVENT_FORM)).should('be.visible');
        cy.get(testidSelector(testIds.SUBMIT_BUTTON)).should('be.disabled');
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
                cy.get(testidSelector(testIds.TITLE_INPUT)).find('input').type(correctData.title);
                cy.get(testidSelector(testIds.SHORT_DESCRIPTION_INPUT)).type(
                    correctData.shortDescription,
                );
                cy.get(testidSelector(testIds.FULL_DESCRIPTION_INPUT)).type(
                    correctData.fullDescription,
                );
                cy.get(testidSelector(testIds.LOCATION_INPUT)).type(correctData.location);
                cy.get(testidSelector(testIds.EMAIL_INPUT)).find('input').type(correctData.email);
                cy.get(testidSelector(testIds.EVENT_DATE_INPUT)).type(correctData.eventDate);
                cy.get(testidSelector(testIds.SUBMIT_BUTTON)).focus().should('not.be.disabled');
                cy.get(testidSelector(testIds.SUBMIT_BUTTON)).click();
                cy.get(testidSelector(testIds.DISPLAY_LOADING_MESSAGE)).should('be.visible');
            });

        cy.wait('@createEvent')
            .its('request.body')
            .should('deep.equal', { ...correctData, eventDate: responseDate });
        cy.get(testidSelector(testIds.DISPLAY_SUCCESS_MESSAGE)).should('be.visible');
    });

    it('should display validation error after blurring input', () => {
        const incorrectEmail = 'asdf.com';
        const tooShort = 'short';
        cy.get(testidSelector(testIds.EVENT_FORM))
            .should('be.visible')
            .within(() => {
                cy.get(testidSelector(testIds.TITLE_INPUT)).find('input').focus().blur();
                cy.get(testidSelector(testIds.TITLE_INPUT))
                    .find('.MuiFormHelperText-root')
                    .should('be.visible')
                    .should('have.text', errorMessages.TITLE_REQUIRED);
                cy.get(testidSelector(testIds.SHORT_DESCRIPTION_INPUT))
                    .find('textarea')
                    .first()
                    .focus()
                    .blur();
                cy.get(testidSelector(testIds.SHORT_DESCRIPTION_INPUT))
                    .find('.MuiFormHelperText-root')
                    .should('be.visible')
                    .should('have.text', errorMessages.SHORT_DESCRIPTION_REQUIRED);
                cy.get(testidSelector(testIds.SHORT_DESCRIPTION_INPUT))
                    .find('textarea')
                    .first()
                    .type(tooShort);
                cy.get(testidSelector(testIds.SHORT_DESCRIPTION_INPUT))
                    .find('.MuiFormHelperText-root')
                    .should('be.visible')
                    .should('have.text', errorMessages.TOO_SHORT);
                cy.get(testidSelector(testIds.EMAIL_INPUT)).find('input').focus().blur();
                cy.get(testidSelector(testIds.EMAIL_INPUT))
                    .find('.MuiFormHelperText-root')
                    .should('be.visible')
                    .should('have.text', errorMessages.EMAIL_REQUIRED);
                cy.get(testidSelector(testIds.EMAIL_INPUT)).find('input').type(incorrectEmail);
                cy.get(testidSelector(testIds.EMAIL_INPUT))
                    .find('.MuiFormHelperText-root')
                    .should('be.visible')
                    .should('have.text', errorMessages.EMAIL_FORMAT);
                cy.get(testidSelector(testIds.EVENT_DATE_INPUT)).find('input').focus().blur();
                cy.get(testidSelector(testIds.EVENT_DATE_INPUT))
                    .find('.MuiFormHelperText-root')
                    .should('be.visible')
                    .should('have.text', errorMessages.DATE_REQUIRED);
                cy.get(testidSelector(testIds.SUBMIT_BUTTON)).should('be.disabled');
            });
    });
});
