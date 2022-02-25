"use strict";

const container = document.getElementById("container");
const canvas = document.getElementById("canvas1");
const file = document.getElementById("fileupload");
const ctx = canvas.getContext("2d"); // canvas has 2d and webgl api for rendering visuals
canvas.width = window.innerWidth; // to set the canvas according to the width of the window
canvas.height = window.innerHeight; // to set the canvas according to the height of the window

let analyser;
let audioSource;

container.addEventListener("click", function () {
  const audio1 = document.getElementById("audio1");
  audio1.src = "Ninelie-(osanime.com).mp3";
  const audioCtx = new AudioContext();
  audio1.play();
  audioSource = audioCtx.createMediaElementSource(audio1);
  analyser = audioCtx.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 64; //The fftSize property of the AnalyserNode interface is an unsigned long value and represents the window size in samples that is used when performing a Fast Fourier Transform (FFT) to get frequency domain data.
  let bufferlength = analyser.frequencyBinCount; //half of the fftSize
  let dataArray = new Uint8Array(bufferlength); //special data format for the buffer
  const barWidth = canvas.width / bufferlength; // width of each bar in the analyser
  let barHeight;
  let x;
  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the old output
    analyser.getByteFrequencyData(dataArray);

    for (let i = 0; i < bufferlength; i++) {
      barHeight = dataArray[i];
      ctx.fillStyle = "white";
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth;
    }
    requestAnimationFrame(animate);
  }
  animate();
});

file.addEventListener("change", function () {
  const files = this.files; // response submitted
  const audio1 = document.getElementById("audio1");
  audio1.src = URL.createObjectURL(files[0]); // as th first parameter in the files object is the url for the audio file
  audio1.load();
  const audioCtx = new AudioContext();
  audio1.play();
  audioSource = audioCtx.createMediaElementSource(audio1);
  analyser = audioCtx.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 64; //The fftSize property of the AnalyserNode interface is an unsigned long value and represents the window size in samples that is used when performing a Fast Fourier Transform (FFT) to get frequency domain data.
  let bufferlength = analyser.frequencyBinCount; //half of the fftSize
  let dataArray = new Uint8(bufferlength); //special data format for the buffer
  const barWidth = canvas.width / bufferlength; // width of each bar in the analyser
  let barHeight;
  let x;
  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the old output
    analyser.getByteFrequencyData(dataArray);

    for (let i = 0; i < bufferlength; i++) {
      barHeight = dataArray[i];
      ctx.fillStyle = "white";
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth;
    }
    requestAnimationFrame(animate);
  }
  animate();
});
