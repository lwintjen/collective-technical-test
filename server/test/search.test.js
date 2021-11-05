const server = "http://localhost:8080"
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.should();
chai.use(chaiHttp);

describe('Fetch 150 crypto currencies', () => {
 it('it should return 150 crypto currencies', () => {
    chai.request(server).get('/api/fetch-cryptos').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.equal(150);
    })
    });
});