

var clientId = '653961089400-1fv9cqiqvgko8na5u9jkn9el9090o2kb.apps.googleusercontent.com';
var apiKey = 'QwdvKpJ63wf8dQEoJTagW68K';
var scopes = 'https://www.googleapis.com/auth/calendar';
var reminder;

function remind(what,where,when,until) {
    reminder = {
    "summary":what,
    "location": where,
    "start": {
      "dateTime": when
    },
    "end": {
      "dateTime": until
    },
    "reminders": {
        "useDefault": false,
        "overrides": [
          {"method": "email", "minutes": 24 * 60},
          {"method": "popup", "minutes": 10}
        ]
    }
  };

}

(function() {

  function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth,1);
    checkAuth();
  }

  function checkAuth() {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
        handleAuthResult);
  }

})();

jQuery( document ).ready(function( $ ) {

  function handleAuthResult(authResult) {
    var authorizeButton = document.getElementById('authorize-button');
    if (authResult) {
      authorizeButton.style.visibility = 'hidden';
      makeApiCall();
    } else {
      authorizeButton.style.visibility = '';
      authorizeButton.onclick = handleAuthClick;
     }
  }

  function handleAuthClick(event) {
    gapi.auth.authorize(
        {client_id: clientId, scope: scopes, immediate: false},
        handleAuthResult);
    return false;
  }$("#authorize-button").click(handleAuthClick);


});

function makeApiCall() {
  gapi.client.load('calendar', 'v3', function() {

      var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': reminder
      });
      request.execute(function(reminder) {
        console.log(reminder);
        // appendPre('Event created: ' + reminder.htmlLink);
      });

      msg.lang = 'en-US';
      msg.text = 'You will be notified about your appointment';
      speak(msg.text);


      var request = gapi.client.calendar.events.list({
        'calendarId': 'primary'
      });

      request.execute(function(resp) {
        for (var i = 0; i < resp.items.length; i++) {
          var li = document.createElement('li');
          li.appendChild(document.createTextNode(resp.items[i].summary));
          document.getElementById('events').appendChild(li);
        }
      });

  });

}
