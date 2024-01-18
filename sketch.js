let capture;
let posenet;
let noseX, noseY;
let leyeX, leyeY;
let reyeX, reyeY;
let singlePose;

function setup() {
    createCanvas(800, 500);
    capture = createCapture(VIDEO);
    capture.hide();

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);
}

function receivedPoses(poses) {
    if (poses.length > 0) {
        singlePose = poses[0].pose;

        // Find the index of the nose dynamically
        let noseIndex = singlePose.keypoints.findIndex(keypoint => keypoint.part === 'nose');
        let leyeIndex = singlePose.keypoints.findIndex(keypoint => keypoint.part == 'leftEye');
        let reyeIndex = singlePose.keypoints.findIndex(keypoint => keypoint.part == 'rightEye');

        if (noseIndex !== -1) {
            noseX = singlePose.keypoints[noseIndex].position.x;
            noseY = singlePose.keypoints[noseIndex].position.y;
        if (leyeIndex !== -1 && reyeIndex !== -1){
            leyeX = singlePose.keypoints[leyeIndex].position.x;
            leyeY = singlePose.keypoints[leyeIndex].position.y;
            reyeX = singlePose.keypoints[reyeIndex].position.x
            reyeY = singlePose.keypoints[reyeIndex].position.y

        }
        
        }
    }
}

function modelLoaded() {
    console.log('Model has loaded');
}

function draw() {
    image(capture, 0, 0);

    // Draw the ellipse only when noseX and noseY are defined
    if (noseX !== undefined && noseY !== undefined) {
        fill(255, 0, 0);
        ellipse(noseX, noseY, 30, 30);
        fill(0,255,0);
        ellipse(leyeX, leyeY, 30, 30);
        fill(0,255,0);
        ellipse(reyeX, reyeY, 30, 30);
    }
}
