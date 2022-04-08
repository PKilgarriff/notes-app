const NotesModel = require("./notesModel");
const NotesApi = require("./notesApi");

class NotesView {
  constructor(model = new NotesModel(), api = new NotesApi()) {
    this.model = model;
    this.api = api;
    this.notesListEl = document.querySelector("#notes-list");
    this.submitButtonEl = document.querySelector("#note-submit-btn");
    this.textInputEl = document.querySelector("#note-input");
    this.mainContainerEl = document.querySelector("#main-container");
    this.errorContainerEl = document.querySelector("#error-container");
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.submitButtonEl.addEventListener("click", () => {
      this.model.addNote((message) => {
        this.displayError(message);
      }, this.textInputEl.value);
      this.displayNotes();
      this.textInputEl.value = "";
    });
    this.textInputEl.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.submitButtonEl.click();
      }
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

  displayError(errorMessage = "Eggscuse me, something's cracked") {
    const errorEl = document.createElement("div");
    console.log(errorMessage);
    Object.assign(errorEl, {
      id: "error-message",
      innerText: errorMessage,
    });
    this.errorContainerEl.append(errorEl);
  }
}

module.exports = NotesView;
