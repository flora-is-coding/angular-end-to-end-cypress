import { HomePage } from '../pages/home.page';
import { AdventureDetailsPage } from '../pages/adventure-details.page';

describe('Adventure', () => {
    const homePage = new HomePage();
    const adventureDetailsPage = new AdventureDetailsPage();

    before(() => {
        cy.deleteAdventure(4);
        cy.createAdventure(4, 'New Adventure');
    })

    it('should visit CarvedRock homepage', () => {
        
        homePage.visit();
    });

    it('should open the New adventure', () => {
        homePage.clickMoreDetailsBtn(4)
        .getAdventureTitle().should('have.text', 'New Adventure');
    });
    it('should post a comment', () => {
        adventureDetailsPage.resetComments()
        .addComment('Laura', 'What a great adventure!')
        .getLastComment().then($el => {
            cy.wrap($el).find('p').should('have.text', 'What a great adventure!');
            cy.wrap($el).find('footer').should('have.text', 'Laura')
        })
})
    it('should not post a comment if the comment text is missing', () => {
        adventureDetailsPage.addComment('Laura', '')
            .getCommentFiledValidationError()
            .should('have.text', 'Comment is required.');
})
})