describe.skip('about try/catch operation.', () => {

  it('use try function', (done) => {

    try {
      throw new Error('Hello Error!');
    } catch (e) {
      sails();

    }

  });

});
