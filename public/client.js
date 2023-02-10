const socket = io();
let name;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");
let time = document.querySelector("#time");
let type = document.querySelector(".typing");

do {
  name = prompt("Please enter your name: ");
  type.innerHTML = `${name} is joined......`;
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
    // socket.emit("typing", e.value);
  }
});

textarea.addEventListener("keypress", function () {
  if (handle.value.length > 0) {
    socket.emit("typing", handle.value);
  }
});

// textarea.addEventListener("keyup", () => {
//   socket.emit("typing", textarea.value);
// });

function sendMessage(message) {
  var currentdate = new Date();
  let msg = {
    user: name,
    message: message.trim(),
    time: currentdate.toLocaleTimeString(),
  };

  // Append
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  // Send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
  let box = ` <p>${msg.time}</p>`;
  mainDiv.innerHTML = markup + box;
  messageArea.appendChild(mainDiv);
}

// Recieve messages
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

// socket.on("typing", (name) => {
//   appendMessage(name, "typing");
//   scrollToBottom();
// });

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
