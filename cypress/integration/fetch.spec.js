/// <reference types="cypress" />

describe('Home (Desktop)', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Repositories list should show as expected', () => {
    cy.get('.login-generator__input').type('deolaj');

    cy.log('Load Github data');
    cy.get('.login-generator__button').click();

    cy.log('Hide Login Generator');
    cy.get('.login-generator').should('have.class', 'hide-content');

    cy.log('Assert Repositories length');
    cy.get('.repository-list').find('li').should('have.length.lessThan', 21);

    cy.log('Show Page Content');
    cy.get('header').should('have.class', 'show-content');
    cy.get('.loading-wrapper').should('have.class', 'hide-wrapper');
    cy.get('.page-content').should('have.class', 'show-content');
  });
});

describe('Home (Mobile)', { viewportWidth: 360 }, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Repositories list should show as expected', () => {
    cy.get('.login-generator__input').type('deolaj');

    cy.log('Load Github data');
    cy.get('.login-generator__button').click();

    cy.log('Hide Login Generator');
    cy.get('.login-generator').should('have.class', 'hide-content');

    cy.log('Assert Repositories length');
    cy.get('.repository-list').find('li').should('have.length.lessThan', 21);

    cy.log('Show Page Content');
    cy.get('header').should('have.class', 'show-content');
    cy.get('.loading-wrapper').should('have.class', 'hide-wrapper');
    cy.get('.page-content').should('have.class', 'show-content');
  });
});
