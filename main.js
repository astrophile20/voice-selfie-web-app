var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
    recognition.onresult = function(event) {
        console.log(event) 
        var content = event.results [0] [0].transcript 
        console.log(content);
        document.getElementById("textbox").innerHTML = content;

        if (content == "take my selfie") {
            console.log("taking selfie--")
            speak()
        }
    };
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data = "Taking your selfie in 5, 4, 3, 2, 1, clicked!";

    var utter_this = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);

    Webcam.attach(camera);

    setTimeout(function() {
        takeSnapshot();
        save();
    }, 5000);
}

Webcam.set({
    width: 360, height: 250, image_format: 'png', png_quality: 90
});

camera = document.getElementById("live-img");

function takeSnapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result-img").innerHTML = "<img id='selfie-img' src=" + data_uri + ">";
    });
}

function save() {
    link = document.getElementById("link");
    img = document.getElementById("selfie-img").src;

    link.href = img;
    link.click();
}