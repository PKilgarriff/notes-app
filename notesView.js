const NotesModel = require("./notesModel");
const NotesApi = require("./notesApi");

class NotesView {
  constructor(model = new NotesModel(), api = new NotesApi()) {
    this.model = model;
    this.api = api;
    this.notesListEl = document.querySelector("#notes-list");
    this.submitButtonEl = document.querySelector("#note-submit-btn");
    this.mainContainerEl = document.querySelector("#main-container");
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.submitButtonEl.addEventListener("click", () => {
      let inputText = document.querySelector("#note-input");
      this.model.addNote(inputText.value);
      this.api.createNote(inputText.value, (data) => {
        console.log(data);
      });
      this.displayNotes();
      inputText.value = "";
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

  displayError() {
    const errorEl = document.createElement("div");
    Object.assign(errorEl, {
      id: "error-message",
      innerText: "Eggscuse me, something's cracked",
    });
    this.mainContainerEl.append(errorEl);
  }
}

module.exports = NotesView;
