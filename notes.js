function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function saveNotes() {
  const notes = [];
  document.querySelectorAll(".textdiv").forEach((note) => {
    notes.push({
      content: note.querySelector(".textarea").innerText,
      color: note.style.backgroundColor,
    });
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  savedNotes.forEach((note) => {
    addNoteToDOM(note.content, note.color);
  });
}

function addNoteToDOM(content = "", color = "") {
  const jdiv = document.createElement("div");
  jdiv.classList.add("textdiv");
  jdiv.style.backgroundColor = color || getRandomColor();

  const jarea = document.createElement("p");
  jarea.contentEditable = "true";

  jarea.classList.add("textarea");
  jarea.innerText = content;
  jarea.spellcheck = "false";
  const dbtn = document.createElement("button");
  dbtn.classList.add("del");
  dbtn.textContent = "Delete";

  jdiv.appendChild(jarea);
  jdiv.appendChild(dbtn);

  notesContainer.appendChild(jdiv);

  dbtn.addEventListener("click", function () {
    jdiv.remove();
    saveNotes();
  });

  jarea.addEventListener("input", saveNotes);
}

const notesContainer = document.createElement("div");
notesContainer.classList.add("notes-container");
document.body.insertBefore(
  notesContainer,
  document.querySelector(".button-container")
);

const btn = document.querySelector(".center-button");

btn.addEventListener("click", function () {
  addNoteToDOM();
  saveNotes();
});

loadNotes();
