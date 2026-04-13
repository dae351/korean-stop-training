// 예시 trial 목록
});

function loadTrial() {
  const trial = trials[currentTrial];

  trialNumber.textContent = `문항 ${currentTrial + 1} / ${trials.length}`;

  currentAudio = new Audio(trial.audio);

  // 자동재생하고 싶으면 아래 줄 사용
  currentAudio.play();

  trialStartTime = Date.now();
}

playButton.addEventListener("click", () => {
  currentAudio.currentTime = 0;
  currentAudio.play();
});

responseButtons.forEach(button => {
  button.addEventListener("click", () => {
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

// csv 다운로드
function convertToCSV(data) {
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
});
