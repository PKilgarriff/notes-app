const NotesModel = require("./notesModel.js");

class NotesView {
  constructor(model = new NotesModel()) {
    this.model = model;
    this.notesListEl = document.querySelector("#notes-list");
    this.submitButtonEl = document.querySelector("#note-submit-btn");

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.submitButtonEl.addEventListener("click", () => {
      let inputText = document.querySelector("#note-input");
      this.model.addNote(inputText.value);
      inputText.value = "";
      this.displayNotes();
    });
  }

  displayNotes() {
    this.notesListEl.innerHTML = "";
    const notes = this.model.getNotes();
    notes.forEach((note) => {
      let div = document.createElement("div");
      Object.assign(div, {
        className: "note",
        innerText: note,
      });
      this.notesListEl.append(div);
    });
  }
}

module.exports = NotesView;
