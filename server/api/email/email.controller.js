/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /api/email/              ->  sendEmail
 */

'use strict';

var Mailgun = require('mailgun-js');

//Your api key, from Mailgun’s Control Panel
var api_key = 'key-XX';

//Your domain, from the Mailgun Control Panel
var domain = 'mg.zoobird.com.br';

//Your sending email address
var from_who = 'no-reply@zoobird.com.br';

export function sendEmail(req, res) {

  let params = req.params;

//We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
  var mailgun = new Mailgun({apiKey: api_key, domain: domain});

  var data = {
    //Specify email data
    from: from_who,
    //The email to contact
    to: "raphael.lsmoraes@gmail.com",
    //Subject and text data
    subject: decodeURIComponent(params.subject),
    html: 'Olá <b>Mauricio</b> <br> Você tem uma nova mensagem:<br><br><br>' +
    '<b>Nome:</b> ' + decodeURIComponent(params.name) +
    '<br><b>Email:</b> ' + decodeURIComponent(params.email) +
    '<br><b>Tel:</b> ' + decodeURIComponent(params.tel) +
    '<br><b>Mensagem:</b> ' + decodeURIComponent(params.msg)
  };

  //Invokes the method to send emails given the above data with the helper library
  mailgun.messages().send(data, function (err, body) {
    //If there is an error, render the error page
    if (err) {
      res.render('error', {error: err});
      console.log("got an error: ", err);
    }
    //Else we can greet    and leave
    else {
      //Here "submitted.jade" is the view file for this landing page
      //We pass the variable "email" from the url parameter in an object rendered by Jade
      res.jsonp({result: 'ok'});
    }
  })
}
