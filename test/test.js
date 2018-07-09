var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var chaiHttp = require('chai-http');
var request = require("request");
var tck = require('../controllers/tickets-data');
var tickets = require('../controllers/tickets-api-controller');
var routes = require('../routes/tickets-route');
var server = require('../server');
chai.use(chaiHttp);

it('should return second page about tickets', function(done) {
  request('http://localhost:8080/tickets', function(error, response, body) {
    expect(response.statusCode).to.equal(200);
    done();
  })
});

describe('Tickets data', () => {

  it('should return the count of tickets in the database', function(done) {
    var ticketsData = new tck();
    //console.log(ticketsData);
    ticketsData.getAllTickets().then(() => {
      console.log('***Tickets data 1) **** \n');
      expect(ticketsData.ticketsAll.ticket).is.not.null;
      done(); // without done(), get error
    });   
  });

  it('should not be null', function(done) {
    var ticketsData = new tck();
    //console.log(ticketsData);
    ticketsData.getAllTickets().then(() => {
      console.log('***Tickets data 2) **** \n', 
      ticketsData.ticketsAll[0].ticket_name);
      expect(ticketsData.ticketsAll.ticket).is.not.null;
      done();
    });
    //expect(ticketsData.ticketsAll.length).to.equal(2);
    // expect(2).to.equal(2);    
  });
});


describe('Tickets', function() {

  it('should list ALL tickets on /tickets GET', function(done) {
    chai.request(server)
      .get('/api/tickets')
      // .then(function(res) {
      //   //console.log('***Tickets 1) **** \n', res.body)
      //   expect(res).to.have.status(200);
      //   //expect(res).to.be.json;
      //   //expect(res).body.should.be.a('array');
      //   done();
      // })
      // .catch(function(err) {
      //   throw err;
      // });
      .end(function(err, res) {
        console.log('***Tickets 1) **** \n', res.body)
        expect(res).to.have.status(200);
        //expect(res).to.be.json;
        //expect(res.body).should.be.a('array');
        done();
      });
  });

  it('should add a single ticket on /tickets POST', function(done) {
    chai.request(server)
    .post('/api/tickets')
    .send({'email': 'abcd@gmail.com', 
          'ticket_name': 'Packer',
          'location': 'Milwakee',
          'price': 2478.00,
          'description': 'This team is Wisconsin pride'})
    .end(function(err, res) {
      console.log('***Tickets 2) **** \n', res.body);
        expect(res).to.have.status(200);
        //expect(res).to.be.json;
        // expect(res.body).should.be.a('object');
        // expect(res.body).should.have.property('SUCCESS');
        // expect(res.body.SUCCESS).should.be.a('object');
        // expect(res.body.SUCCESS).should.have.property('ticket_name');
        // expect(res.body.SUCCESS).should.have.property('location');
        // expect(res.body.SUCCESS).should.have.property('price');
        // expect(res.body.SUCCESS).should.have.property('_id');
        // expect(res.body.SUCCESS).first_name.should.equal('dumb');
        // expect(res.body.SUCCESS).last_name.should.equal('stupid');
        done();
      });
  });

  it('should list a single ticket on /tickets/:id GET');
})
