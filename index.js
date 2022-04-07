const NotesView = require("./notesView.js");
const NotesModel = require("./notesModel.js");
const NotesApi = require("./notesApi.js");

const api = new NotesApi();
const model = new NotesModel();
const view = new NotesView(model, api);

// view.displayNotes();

console.log(model.getNotes());

api.loadNotes(
  (notes) => {
    model.setNotes(notes);
    view.displayNotes();
  },
  (message) => {
    view.displayError(message);
  }
);
