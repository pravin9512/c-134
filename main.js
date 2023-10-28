status = ""
var audio;
object = []
function preload() {
    soundFormats('mp3', 'ogg');
    audio = loadSound("leo_badass.mp3");
}

function setup() {

    canvas = createCanvas(380, 380)
    canvas.center()
    audio.play()
    video = createCapture(VIDEO)
    video.size(380, 380)
    video.hide()
    object_detect = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "Status:detecting objects"


}

function modelloaded() {
    console.log("model loaded successfuly")
    status = true

}

function got_results(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results)
        object = results
    }
}

function draw() {
    image(video, 0, 0, 640, 420)

    if (status != "") {
        r = random(255)
        g = random(255)
        b = random(255)
        object_detect.detect(video, got_results)
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status :object detected"

            fill(r, g, b)
            percent = floor(object[i].confidence * 100)
            text(object[i].label + " " + percent + "%", object[i].x + 20, object[i].y + 20)
            noFill()
            stroke(r, g, b)
            rect(object[i].x, object[i].y, object[i].width, object[i].height)
            if (object[i].label == "person") {
                audio.stop();
                document.getElementById("num").innerHTML="Baby found"
       
            } else {
                audio.play();
                document.getElementById("num").innerHTML="Baby not found"
            }
        }
    }


}