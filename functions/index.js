const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
const cors = require('cors')({origin: true});

admin.initializeApp(functions.config().firebase);

exports.recievedNewSubscriber = functions.firestore.document('mailchimp-emails/{pushId}').onCreate(function (event) {
  const newValue = event.data.data();
  const email = newValue.email;
  return request.post('https://us4.api.mailchimp.com/3.0/lists/' + functions.config().mailchimp.early.list + '/members', {
    'auth': {
      'user': 'anystring',
      'password': functions.config().mailchimp.api
    },
    'json': {
      "email_address": email,
      "status": "subscribed"
    }
  });
});

exports.getTickets = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const options = {
      url: 'https://api.tito.io/v2/devfest-cz/2018/releases',
      headers: {
        'Authorization': 'Token token=YOUR-API-KEY',
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/json'
      }
    };
    request.get(options, (error, response, body) => {
      res.send(processTickets(JSON.parse(body)));
    });
  });
});

function processTickets(body) {
  const earlyBirds = body.data.filter(it => it.attributes.title === 'Early bird - Student/Diversity'
    || it.attributes.title === 'Early bird - Individual' || it.attributes.title === 'Early bird - Company funded');
  const regular = body.data.filter(it => it.attributes.title === 'Student/Diversity'
    || it.attributes.title === 'Individual' || it.attributes.title === 'Company funded');
  const lazyBirds = body.data.filter(it => it.attributes.title === 'Lazy bird - Student/Diversity'
    || it.attributes.title === 'Lazy bird - Individual' || it.attributes.title === 'Lazy bird - Company funded');
  const vip = body.data.filter(it => it.attributes.title === 'VIP');
  return [ mergeTickets(earlyBirds), mergeTickets(regular), mergeTickets(lazyBirds), mergeTickets(vip) ];
}

function mergeTickets(tickets) {
  if (tickets.length > 1) {
    const individualTicket = tickets.filter(it => it.attributes.title.indexOf('Individual') !== -1)[0];
    const studentTicket = tickets.filter(it => it.attributes.title.indexOf('Student') !== -1)[0];
    const companyTicket = tickets.filter(it => it.attributes.title.indexOf('Company funded') !== -1)[0];
    const individualPrice = {price: individualTicket.attributes.price, title: 'Individual'};
    const companyPrice = {price: companyTicket.attributes.price, title: 'Company funded'};
    const studentPrice = {price: studentTicket.attributes.price, title: 'Student'};
    const prices = [individualPrice, companyPrice, studentPrice];
    const basicTitle = individualTicket.attributes.title.substring(0, individualTicket.attributes.title.indexOf('-') - 1) || 'Regular';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const startDate = new Date(individualTicket.attributes['start-at']);
    const endDate = new Date(individualTicket.attributes['end-at']);
    const quantity = individualTicket.attributes.quantity + studentTicket.attributes.quantity + companyTicket.attributes.quantity;
    return {
      actual: now >= startDate && now <= endDate,
      description: `From ${months[startDate.getMonth()]} ${startDate.getDate()} to ${months[endDate.getMonth()]} ${endDate.getDate()}<br>Or ${quantity} first`,
      price: prices,
      order: 1,
      soldOut: false,
      title: basicTitle,
      support: false
    };
  } else {
    const supportTicket = tickets[0];
    const price = {price: supportTicket.attributes.price, title: 'Support'};
    const prices = [price];
    return {
      actual: supportTicket.attributes.state === 'on_sale',
      description: 'You want to support community',
      price: prices,
      order: 1,
      soldOut: false,
      title: 'VIP',
      support: true
    };
  }
}
