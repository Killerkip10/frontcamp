import { ARTICLE_TOPICS, DATA_CY } from 'components/News/NewsList/constants';

describe('NewsList page', () => {
   it('Should redirect to default page with default filter', () => {
      cy.visit('/');

      cy.url().should('include', '/news');

      cy.get(`[data-cy="${DATA_CY.LOADING}"]`);

      cy.get(`[data-cy="${DATA_CY.SELECT_TOPIC}"]`)
          .should('have.value', ARTICLE_TOPICS.ARTS);

      cy.get(`[data-cy="${DATA_CY.LIST_ITEM}"]`)
          .should('not.have.length', 0);
   });

   it('Should redirect to news info page after details click', () => {
       cy.visit('/');

       cy.get(`[data-cy="${DATA_CY.LIST_ITEM}"] > button`)
           .eq(0)
           .click();

       cy.url().should('include', '/news/0/arts');
   });
});