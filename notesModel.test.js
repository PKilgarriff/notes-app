const NotesModel = require("./notesModel.js");
const errorCallback = (message) => {
  console.log(`Error Callback: ${message}`);
};

describe(NotesModel, () => {
  describe("Get notes", () => {
    const notes = new NotesModel();

    it("getNotes should return an empty array", () => {
      expect(notes.getNotes()).toEqual([]);
    });

    it("should return the added notes", () => {
      const anInterestingNote = "abcdefU";
      notes.addNote(errorCallback, anInterestingNote);
      expect(notes.getNotes()).toEqual([anInterestingNote]);
    });
  });

  describe("Set Notes", () => {
    it("stores an array of notes", () => {
      const notes = new NotesModel();
      notes.setNotes(["Eg", "Egg", "Eggie"]);
      expect(notes.getNotes()).toEqual(["Eg", "Egg", "Eggie"]);
    });
  });

  describe("Add note", () => {
    it("should respond to add note", () => {
      const notes = new NotesModel();
      expect(() => {
        notes.addNote(errorCallback, "Egg Test");
      }).not.toThrow();
    });
  });
});
