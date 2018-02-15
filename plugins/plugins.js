var whatday = function() {

	 var today = new Date();
	 var dd = today.getDate();
	 var mm = today.getMonth()+1; //January is 0!
	 var yyyy = today.getFullYear();
	 var hour = today.getHours();
	 var minutes = today.getMinutes();

	 if(dd<10) {
			 dd='0'+dd
	 }

	 if(mm<10) {
			 mm='0'+mm
	 }
	 if (minutes<10) {
		 minutes='0'+minutes
	 }

	 today = dd+'/'+mm+'/'+yyyy;
	 msg.text = today;

	 speak(dd+'/'+mm+'/'+yyyy);
	 speak('Its' + hour + 'hours and' + minutes + 'minutes');

	return (today + '. Its ' + hour + ' hours and ' + minutes + ' minutes');

}


function greetFunction (username) {
	speak('Hey' + username + 'how are you');
}


/*
jQuery(document).ready(function($){

	var template = twig({
	    data: 'The {{ tweet }} is a lie.'
	});

$('#images').append('<h2>' + template.render({tweet: 'tweet'}) + '</h2>');

});
*/
