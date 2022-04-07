(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // notesModel.js
  var require_notesModel = __commonJS({
    "notesModel.js"(exports, module) {
      var NotesModel2 = class {
        constructor() {
          this.notes = [];
        }
        getNotes() {
          return this.notes;
        }
        setNotes(notes) {
          notes.forEach((note) => {
            this.addNote(note);
          });
        }
        addNote(note) {
          this.notes.push(note);
        }
      };
      module.exports = NotesModel2;
    }
  });

  // notesApi.js
  var require_notesApi = __commonJS({
    "notesApi.js"(exports, module) {
      var NotesApi2 = class {
        async loadNotes(callback, errorCallback) {
          try {
            const response = await fetch("http://localhost:3000/notes");
            const data = await response.json();
            callback(data);
          } catch (error) {
            errorCallback("Cannot load \u{1F95A}\u{1F95A}\u{1F95A}, coneggtion scrambled");
          }
        }
        async createNote(noteMessage, callback, errorCallback) {
          try {
            const response = await fetch("http://localhost:3000/notes", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ content: noteMessage })
            });
            const data = await response.json();
            console.log(data);
            callback(data);
          } catch (error) {
            console.log(error.message, error.name);
            errorCallback("Cannot create Egg, conneggtion scrambled");
          }
        }
      };
      module.exports = NotesApi2;
    }
  });

  // notesView.js
  var require_notesView = __commonJS({
    "notesView.js"(exports, module) {
      var NotesModel2 = require_notesModel();
      var NotesApi2 = require_notesApi();
      var NotesView2 = class {
        constructor(model2 = new NotesModel2(), api2 = new NotesApi2()) {
          this.model = model2;
          this.api = api2;
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
            }, (message) => {
              this.displayError(message);
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
              innerText: note
            });
            this.notesListEl.append(div);
          });
        }
        displayError(errorMessage = "Eggscuse me, something's cracked") {
          const errorEl = document.createElement("div");
          console.log(errorMessage);
          Object.assign(errorEl, {
            id: "error-message",
            innerText: errorMessage
          });
          this.mainContainerEl.append(errorEl);
        }
      };
      module.exports = NotesView2;
    }
  });

  // index.js
  var NotesView = require_notesView();
  var NotesModel = require_notesModel();
  var NotesApi = require_notesApi();
  var api = new NotesApi();
  var model = new NotesModel();
  var view = new NotesView(model, api);
  console.log(model.getNotes());
  api.loadNotes((notes) => {
    model.setNotes(notes);
    view.displayNotes();
  }, (message) => {
    view.displayError(message);
  });
})();
