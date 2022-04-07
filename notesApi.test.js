const NotesApi = require("./notesApi");

require("jest-fetch-mock").enableMocks();

describe("NotesApi", () => {
  it("calls fetch and loads notes from the backend", (done) => {
    const api = new NotesApi();
    fetch.mockResponseOnce(
      JSON.stringify({ 0: "This note is coming from the server" })
    );
    api.loadNotes((notesObject) => {
      expect(notesObject[0]).toEqual("This note is coming from the server");
      done();
    });
  });
});
