/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const NotesView = require("./notesView.js");
const NotesModel = require("./notesModel.js");
const apiMock = {
  loadNotes: () => [
    "This note is coming from the server",
    "egg",
    "Cracking show old chap!",
    "Eggsactly this",
  ],
  createNote: (input) => "",
};

beforeEach(() => {
  document.body.innerHTML = fs.readFileSync("./index.html");
  model = new NotesModel();
  view = new NotesView(model, apiMock);
});

describe("NotesView", () => {
  it("a note should appear once the add note button is pressed", (done) => {
    document.querySelector("#note-input").value = "eGgS";
    const submitButtonEl = document.querySelector("#note-submit-btn");
    submitButtonEl.click();

    expect(
      document.querySelector("#notes-list :nth-child(1)").innerText
    ).toEqual("eGgS");
    done();
  });

  it("should display all notes", () => {
    model.addNote("eggs");
    model.addNote("eggstra eggs");

    view.displayNotes();

    expect(document.querySelectorAll(".note").length).toEqual(2);
  });

  it("should always display the right number of notes", () => {
    let notesToAdd = ["egg1", "egg2", "egg3"];

    notesToAdd.forEach((note) => {
      document.querySelector("#note-input").value = note;
      const submitButtonEl = document.querySelector("#note-submit-btn");
      submitButtonEl.click();
    });

    expect(document.querySelectorAll(".note").length).toEqual(3);
  });

  it("should display an error message if required", () => {
    view.displayError();

    expect(document.querySelector("#error-message").innerText).toEqual(
      "Eggscuse me, something's cracked"
    );
  });
});
