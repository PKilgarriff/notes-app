const NotesApi = require("./notesApi");

class NotesModel {
  constructor(api = new NotesApi()) {
    this.notes = [];
    this.api = api;
    this.errorCallback = (message) => {
      console.log(`Error Callback: ${message}`);
    };
  }

  getNotes() {
    return this.notes;
  }

  setNotes(notes) {
    notes.forEach((note) => {
      this.addNote(this.errorCallback, note);
    });
  }

  addNote(errorCallback, note) {
    this.notes.push(note);
    this.api.createNote(
      note,
      (data) => {
        console.log(data);
      },
      (errorMessage) => {
        errorCallback(errorMessage);
      }
    );
  }
}

module.exports = NotesModel;
