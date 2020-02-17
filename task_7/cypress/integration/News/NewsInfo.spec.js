import { DATA_CY } from 'components/News/NewsInfo/constants';

describe('NewsInfo page', () => {
    it('Should load news details page', () => {
        cy.visit('/news/0/arts');

        cy.get(`[data-cy="${DATA_CY.LOADING}"]`);

        cy.get(`[data-cy="${DATA_CY.ITEM_INFO}"]`);
    });
});