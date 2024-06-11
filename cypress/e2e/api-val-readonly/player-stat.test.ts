describe('Read', () => {
  it('should respond 200 and an array with 3 items', () => {
    const params = new URLSearchParams({
      page_offset: '0',
      page_length: '3',
      sort_field: 'name',
      sort_order: 'descending',
    });
    cy.request({
      method: 'GET',
      url: `/api/web/players/stats?${params}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(3);
    });
  });
});

describe('Create', () => {
  it('should respond 401', () => {
    cy.request({
      method: 'POST',
      url: '/api/web/players/stats',
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});

describe('Update', () => {
  it('should respond 401', () => {
    cy.request({
      method: 'PATCH',
      url: '/api/web/players/1/stats/1',
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});

describe('Delete', () => {
  it('should respond 401', () => {
    cy.request({
      method: 'DELETE',
      url: '/api/web/players/1/stats/1',
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
