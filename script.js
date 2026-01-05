/* ==============================
   ひさきとの記録 / script.js
============================== */

/* ===== アイコン ===== */
const ICON =
"https://image.jimcdn.com/app/cms/image/transf/none/path/scb3e5f8e10f09c5a/image/i42f070fe8b72558e/version/1767461888/image.jpg";

/* ===== タイムライン ===== */
const timeline = [
  {
    type: "scene",
    text: "あなたは、ひさきに連絡を取った。",
    duration: 3
  },
  {
    type: "chat",
    messages: [
      { side: "right", text: "ひさきって河岸県出身だよね？", delay: 2.5 },
      { side: "left", text: "そうだよ！", delay: 2.5 },
      { side: "left", text: "どうしたの？", delay: 2.5 },
      { side: "right", text: "ちょっとバイトに応募してほしくて...", delay: 2.5 },
      { side: "left", text: "バイト？何かあった？", delay: 2.5 }
    ]
  },
  {
    type: "scene",
    text: "あなたは今までのことを<br>すべてひさきに話した。",
    duration: 3
  },
  {
    type: "chat",
    messages: [
      { side: "left", text: "...なるほど、そんなことがあったんだね...", delay: 2.5 },
      { side: "right", text: "お願い、だから協力してほしい！", delay: 2.5 },
      { side: "left", text: "いいよ。", delay: 2.5 },
      { side: "left", text: "私に任せて！", delay: 2.5 },
      { side: "left", text: "君の為なら何でもする。", delay: 2.5 },
      { side: "left", text: "私も何度か君に助けられたからね！", delay: 2.5 },
      { side: "right", text: "ありがとう！", delay: 2.5 },
      { side: "left", text: "それで私はどうしたらいいの？", delay: 2.5 }
    ]
  },
  {
    type: "scene",
    text: "作戦を伝えているうちに、<br>あなたは今までの記憶を一つ一つ思い出していった。",
    duration: 4.5
  },
  {
    type: "chat",
    messages: [
      { side: "left", text: "分かった！当日は頑張って捕まえれるようにするね！", delay: 2.5 },
      { side: "right", text: "ありがとう！", delay: 2.5 },
      { side: "left", text: "それじゃ。頑張ってくるね！", delay: 2.5 }
    ]
  },
  {
    type: "scene",
    text: "そこでひさきと連絡は途絶えた",
    duration: 4
  },
  {
    type: "scene",
    text: "LINEに【ほんとうのおわり】と送信しよう。",
    duration: 999
  }
];

/* ===== DOM取得 ===== */
const startEl = document.getElementById("start");
const sceneEl = document.getElementById("scene");
const chatEl = document.getElementById("chat");
const chatBody = document.getElementById("chatBody");

const bgm = document.getElementById("bgm");
const bgmToggle = document.getElementById("bgmToggle");

/* ===== 状態 ===== */
let step = 0;

/* ===== BGM制御 ===== */
function setBgmState(on) {
  bgmToggle.checked = on;

  if (on) {
    bgm.play().catch(() => {});
  } else {
    bgm.pause();
  }
}

bgmToggle.onchange = () => setBgmState(bgmToggle.checked);

/* ===== ストーリー開始 ===== */
function startStory() {
  startEl.style.display = "none";
  setBgmState(bgmToggle.checked);
  next();
}

/* ===== 次のシーンへ ===== */
function next() {
  if (step >= timeline.length) return;

  const item = timeline[step++];

  if (item.type === "scene") {
    chatEl.classList.remove("active");
    sceneEl.classList.add("active");
    sceneEl.innerHTML = item.text;

    if (bgmToggle.checked) bgm.play();

    setTimeout(next, item.duration * 1000);

  } else {
    sceneEl.classList.remove("active");
    chatEl.classList.add("active");

    if (bgmToggle.checked) bgm.play();

    chatBody.innerHTML = "";
    showMessages(item.messages, 0);
  }
}

/* ===== メッセージ表示 ===== */
function showMessages(msgs, i) {
  if (i >= msgs.length) {
    setTimeout(next, 2000);
    return;
  }

  const m = msgs[i];
  const wrap = document.createElement("div");
  wrap.className = "message-wrap " + m.side;

  if (m.side === "left") {
    const img = document.createElement("img");
    img.src = ICON;
    img.className = "icon";
    wrap.appendChild(img);
  }

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = m.text;
  wrap.appendChild(bubble);

  chatBody.appendChild(wrap);
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    showMessages(msgs, i + 1);
  }, m.delay * 1000);
}