leftWristY=0;
rightWristY=0;
leftWristX=0;
rightWristX=0;
song="";
function preload()
{
song=loadSound("mike.mp3");
}
function setup()
{
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}
function gotPoses(results)
{
if(results.length>0)
{
console.log(results);
leftWristX=results[0].pose.leftWrist.x;
rightWristX=results[0].pose.rightWrist.x;
leftWristY=results[0].pose.leftWrist.y;
rightWristY=results[0].pose.rightWrist.y;
console.log("leftWristX= " +leftWristX+ "leftWristY= " +leftWristY);
console.log("rightWristX= " +rightWristX+ "rightWristY= " +rightWristY);
scoreLeftWrist=results[0].pose.keypoints[9].score;
console.log("scoreLeftWrist= "+scoreLeftWrist);
}
}
function modelLoaded()
{
console.log('poseNet is initiallized');
}
function draw()
{
image(video,0,0,600,500);
fill("#E98528");
stroke("#6F303D")
if(scoreLeftWrist > 0.2)
{  
circle(leftWristX,leftWristY,20);
InNumberLeftWristY= Number(leftWristY);
remove_decimal = floor(InNumberLeftWristY);
volume= remove_decimal/500;
document.getElementById("volume").innerHTML="volume= "+volume;
song.setVolume(volume);
}
}
function play()
{
song.play();
song.setVolume(1);
song.rate(1);
}