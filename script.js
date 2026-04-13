const trials = [
  { audio: "audio/ta_low.wav", correct: "lenis" },
  { audio: "audio/ta_high.wav", correct: "aspirated" },
  { audio: "audio/pa_low.wav", correct: "lenis" },
  { audio: "audio/ka_high.wav", correct: "aspirated" }
];

trials.sort(() => Math.random() - 0.5);

let currentTrial = 0;
let responses = [];
let currentAudio = null;
let trialStartTime = null;

const instructions = document.getElementById("instructions");
const experiment = document.getElementById("experiment");
const finished = document.getElementById("finished");
const startButton = document.getElementById("startButton");
const playButton = document.getElementById("playButton");
const trialNumber = document.getElementById("trialNumber");
const responseButtons = document.querySelectorAll(".response");
const downloadButton = document.getElementById("downloadButton");

startButton.addEventListener("click", () => {
  instructions.classList.add("hidden");
  experiment.classList.remove("hidden");
  loadTrial();
});

function loadTrial() {
  const trial = trials[currentTrial];
  trialNumber.textContent = `문항 ${currentTrial + 1} / ${trials.length}`;
  currentAudio = new Audio(trial.audio);
  trialStartTime = Date.now();
}

playButton.addEventListener("click", async () => {
  if (!currentAudio) return;

  try {
    currentAudio.currentTime = 0;
    await currentAudio.play();
  } catch (error) {
    alert("오디오 재생에 실패했습니다. 파일 경로를 확인하세요.");
    console.error("Audio playback error:", error);
  }
});

responseButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (currentTrial >= trials.length) return;

    const response = button.dataset.response;
    const reactionTime = Date.now() - trialStartTime;

    responses.push({
      trial: currentTrial + 1,
      audio: trials[currentTrial].audio,
      response: response,
      correct: trials[currentTrial].correct,
      accuracy: response === trials[currentTrial].correct,
      reactionTime: reactionTime
    });

    currentTrial++;

    if (currentTrial < trials.length) {
      loadTrial();
    } else {
      experiment.classList.add("hidden");
      finished.classList.remove("hidden");
    }
  });
});

function convertToCSV(data) {
  if (data.length === 0) return "";

  const header = Object.keys(data[0]).join(",");
  const rows = data.map(row => Object.values(row).join(","));
  return [header, ...rows].join("\n");
}

downloadButton.addEventListener("click", () => {
  const csv = convertToCSV(responses);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "responses.csv";
  a.click();

  URL.revokeObjectURL(url);
});
