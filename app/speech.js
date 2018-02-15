var msg = new SpeechSynthesisUtterance();

//msg.voice = voices[10]; // Note: some voices don't support altering params

//msg.volume = 1; // 0 to 1
//msg.rate = 1; // 0.1 to 10
msg.pitch = 1.0; //0 to 2
msg.lang = 'en-GB';

function speak(text){
//  annyang.pause();

  msg.text = text;
  msg.voiceURI = 'Google UK English Female';
  speechSynthesis.speak(msg);
  doWait();
}

function doWait() {
    if(speechSynthesis.speaking) {//we want it to match
        setTimeout(doWait, 500);//wait 50 millisecnds then recheck
    }
    else {
      //real action
      console.log("DONE WAITING FOR SPEECH");
    }


}


//annyang.start({ autoRestart: false, continuous: false });
