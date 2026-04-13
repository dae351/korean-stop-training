export default function KoreanStopExperimentPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl shadow-sm p-8 border border-slate-200">
          <h1 className="text-3xl font-bold mb-3">한국어 어두 폐쇄음 지각 실험</h1>
          <p className="text-slate-700 leading-7">
            GitHub Pages에 올릴 수 있는 졸업논문 실험 페이지의 기본 구조입니다.
            실험은 다음과 같이 구성하면 됩니다.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-slate-100 p-4">
              <h2 className="font-semibold text-lg mb-2">1. 참가자 정보 및 동의</h2>
              <ul className="list-disc ml-5 text-slate-700 space-y-1">
                <li>나이, 성별, 모국어, 한국어 학습 기간 입력</li>
                <li>한국어 숙련도(예: TOPIK, 자기평가) 입력</li>
                <li>실험 참여 동의 체크</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <h2 className="font-semibold text-lg mb-2">2. Pre-test</h2>
              <p className="text-slate-700">
                서로 다른 자극을 들려주고 평음/격음/경음 중 무엇인지 고르게 합니다.
                자극은 training과 겹치지 않도록 분리합니다.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <h2 className="font-semibold text-lg mb-2">3. Training</h2>
              <p className="text-slate-700">
                정답과 피드백을 즉시 제공하는 훈련 단계입니다. F0에 주의를 기울이도록 안내 문구를 넣을 수 있습니다.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <h2 className="font-semibold text-lg mb-2">4. Post-test</h2>
              <p className="text-slate-700">
                Pre-test와는 다른 새로운 자극을 사용하여 훈련 효과를 측정합니다.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-8 border border-slate-200">
          <h2 className="text-2xl font-bold mb-4">실험 trial 예시</h2>

          <div className="rounded-2xl border border-slate-200 p-6 space-y-5">
            <div className="flex justify-between items-center text-sm text-slate-500">
              <span>Trial 12 / 60</span>
              <span>남은 시간: 자유</span>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div className="bg-slate-700 h-full w-1/5 rounded-full" />
            </div>

            <div className="text-center py-4">
              <button className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-medium hover:opacity-90 transition">
                음성 재생
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button className="rounded-2xl border border-slate-300 p-4 hover:bg-slate-100 transition font-medium">
                평음
              </button>
              <button className="rounded-2xl border border-slate-300 p-4 hover:bg-slate-100 transition font-medium">
                격음
              </button>
              <button className="rounded-2xl border border-slate-300 p-4 hover:bg-slate-100 transition font-medium">
                경음
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-8 border border-slate-200">
          <h2 className="text-2xl font-bold mb-4">필요한 파일 구조</h2>
          <pre className="bg-slate-950 text-slate-100 rounded-2xl p-5 overflow-x-auto text-sm leading-6">
{`public/
  audio/
    pretest/
    training/
    posttest/

src/
  data/
    trials.js
  components/
    ConsentPage.jsx
    TrialPage.jsx
    TrainingPage.jsx
    SurveyPage.jsx
  App.jsx`}
          </pre>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-8 border border-slate-200">
          <h2 className="text-2xl font-bold mb-4">trials.js 예시</h2>
          <pre className="bg-slate-950 text-slate-100 rounded-2xl p-5 overflow-x-auto text-sm leading-6">
{`export const pretestTrials = [
  {
    id: 1,
    audio: "/audio/pretest/ga_01.wav",
    correct: "평음",
    condition: "lowF0"
  },
  {
    id: 2,
    audio: "/audio/pretest/kka_01.wav",
    correct: "경음",
    condition: "highF0"
  }
];`}
          </pre>

          <p className="mt-4 text-slate-700 leading-7">
            각 trial에서 참가자의 응답, 반응시간, 자극 종류(F0 조건, VOT 조건), 정답 여부를 저장한 뒤 마지막에 CSV로 다운로드하면 됩니다.
          </p>
        </div>
      </div>
    </div>
  )
}
