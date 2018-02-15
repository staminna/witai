var micstatus=true;
var neededData; // api keys
var v;

(function ($) {

  var mic = new Wit.Microphone(document.getElementById("microphone"));
  var info = function (msg) {
    //document.getElementById("info").innerHTML = msg;
    notify(msg,"info");
  };
  var error = function (msg) {
    //document.getElementById("error").innerHTML = msg;
    notify(msg,"error");
  };
  mic.onready = function () {
    info("Microphone is ready to record");
    micstatus=false; // enable autostart if you like here.
  };
  mic.onaudiostart = function () {
    //info("Recording started");

    setTimeout(function () {
        mic.stop();
    }, 12000);

  };
  mic.onaudioend = function () {
    //info("Recording stopped, processing started");

  };
  mic.onresult = function (intent, entities) {
    var r = kv("intent", intent);

    for (var k in entities) {
      var e = entities[k];

      if (!(e instanceof Array)) {
        r += kv(k, e.value);
      } else {
        for (var i = 0; i < e.length; i++) {
          r += kv(k, e[i].value);
        }
      }
    }   // variavel "e" é undifined.

    switch (intent) {
      case 'remind':
        console.log(entities);
        if (typeof entities.agenda_entry != 'undefined') {
          var what = entities.agenda_entry.body;
        }
        if (typeof entities.location != 'undefined') {
          var where = entities.location.body;
        }
        if (typeof entities.datetime != 'undefined') {
          var when = entities.datetime.value.from;
          var until = entities.datetime.value.to;
        }
        if (typeof entities.datetime[1] != 'undefined') {
          var when = entities.datetime[0].value.from;
          var until = entities.datetime[0].value.to;
        }

        console.log("where:" + where + " what:"+ what + " when:" + when);
        remind(what,where,when,until);
        document.getElementById('authorize-button').click();

        break;

      case 'search_google':
        console.log(entities);
        if (typeof entities.search_query != 'undefined') {
          element.execute(entities.search_query.value);
        }
        break;

      case 'get_me_a_pizza':
        msg.text = 'I\'ll find you a pizza nearby';
        mic.stop();
        speak(msg.text);
        break;

      case 'Thank_you':
        msg.text = 'You\'r welcome';
        mic.stop();
        speak(msg.text);
        break;

      case 'say':
        speak(entities.message_body.body + '!');
        $("#results").text(entities.message_body.body);
        break;

      case 'What_day_is_it_':
        var dia = whatday();

        $('#results').empty().append('<h2>' + dia + '</h2>').fadeIn(5000);
        $('#results').fadeOut(6000);


        notify(dia, "date");
        mic.start();
        break;

      case 'refresh':
        msg.text = 'Refreshing';
        speak(msg.text);
        location.reload();
        break;

      case 'show_me':

        if (typeof entities.search_query != 'undefined') {
          getFlickr(entities.search_query.value);
        }
        break;

      case 'open':
        console.log(entities.search_query.value);
        var openurl = "http://www." + entities.search_query.value + ".com";
        window.open(openurl, '_newtab');
        break;

      case 'clear':
        $('#images').empty();
      break;
    }

    console.log("Intent: " + intent);
    console.log(entities);
    //document.getElementById("result").innerHTML = r; // intent

  };
  mic.onerror = function (err) {
    error("Error: " + err);
  };
  mic.onconnecting = function () {
    info("Microphone is connecting");
  };
  mic.ondisconnected = function () {
    info("Microphone is not connected");
  };

  mic.connect("6FLJURAS46PSFLKCIANOXHRKFM4HFKRO");

  $(window).keypress(function (e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      e.preventDefault()

      switch(micstatus)
      {
        case false:
          mic.start();
          micstatus=true;
          //notify("starting microphone", "Status");
          break;
        case true:
            mic.stop();
            micstatus=false;
            //notify("stoping mic", "Status");
            break;

      }
    }
  })


  function kv (k, v) {
    if (toString.call(v) !== "[object String]") {
      v = JSON.stringify(v);
    }
    console.log(v); // o parametro do intent
    return k + "=" + v + "\n";
  }


var getFlickr = function(query) {

  console.log(query);

  $.getJSON('keys',function(jsonData){
    neededData = jsonData;
  });

    var searchTerm = query;
  //  console.log(neededData.data[1]);
    var Flickurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=709b2efe5983f428a9a6477cb253efba&";
    var tags = "&tags=" + searchTerm;
    var tagmode = "&tagmode=any";
    var jsonFormat = "&format=json&nojsoncallback=1";
    var FinalURL = Flickurl + tags + tagmode + jsonFormat;

     $.getJSON(FinalURL, function(photos) {

       for (var i = 0; i < 12; i++) {
         var photo = photos.photos.photo[i];
         console.log(photo);

         var photoUrl = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";

         $('#images').append('<img src="' + photoUrl + '"/>');
        // $( "<img>" ).attr( "src", photoUrl).appendTo( "#images" );
       }
    });
  }

function notify(notification, subject){
  $.fn.tikslusnotyrious({title:subject,
  message:notification,
  sticky:false,
  stayInterval:3000,
  skinPath:'modules/jquery_notification/css/',
  skin:'hades',
  picture:'sites/default/files/me.jpg'
  });
}

})(jQuery);
