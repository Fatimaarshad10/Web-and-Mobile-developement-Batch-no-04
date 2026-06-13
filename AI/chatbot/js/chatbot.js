// Chat widget — handles UI and keeps history.
const history = []; // { role, content }

export function initChatbot() {
  const el = {
    toggle: document.getElementById("chatToggle"),
    win: document.getElementById("chatWindow"),
    close: document.getElementById("chatClose"),
    body: document.getElementById("chatBody"),
    form: document.getElementById("chatForm"),
    input: document.getElementById("chatInput"),
  };

  const open = (show) => el.win.classList.toggle("open", show);
  el.toggle.onclick = () => open(true);
  el.close.onclick = () => open(false);

  // Greeting
  bubble(el.body, "bot", "Hi! 👋 I'm your Solea assistant. How can I help?");

  el.form.onsubmit = (e) => {
    e.preventDefault();
    const text = el.input.value.trim();
    if (!text) return;

    el.input.value = "";
    bubble(el.body, "user", text);
    history.push({ role: "user", content: text });

    const reply =
      "Thanks for your message! Our AI assistant is currently unavailable.";
    bubble(el.body, "bot", reply);
    history.push({ role: "assistant", content: reply });
    el.body.scrollTop = el.body.scrollHeight;
  };
}

// Append a message bubble and return it (so we can update it later).
function bubble(body, who, text) {
  const div = document.createElement("div");
  div.className = `msg msg--${who}`;
  div.textContent = text;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
  return div;
}
