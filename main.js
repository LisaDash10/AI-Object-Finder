status1 = "";
objects = [];

function preload() {

}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 400);
    video.hide();
}

function draw() {
    image(video, 0, 0, 500, 500);

    if(status1 != "") {

        for(i=0; i < objects.length; i++) {

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input) {
                videoLiveView.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_detected").innerHTML = "Object Found";
                var synth = window.speechSynthesis();
                var utterThis = new SpeechSynthesisUtterance("Object found");
                synth.speak(utterThis);
            }
            else {
                document.getElementById("object_detected").innerHTML = "Object not found";
            }
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innnerHTML = 'Status : Detecting Objects';
    input = document.getElementById("input1").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status1 = true;
}

function gotResults(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;    
}