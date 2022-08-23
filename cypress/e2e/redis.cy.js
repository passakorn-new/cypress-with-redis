
// Example Get Set in cypress
describe('Check Time Movie', () => {
    it('Go to url', async() => {
        cy.task('redis-operation', { operation: 'set', key: 'author', value: 'passakorn' })
        cy.task('redis-operation', { operation: 'get', key: 'author' }).then((value) => {
            alert(value)
        });
    })
})