const NotesApi = require("./notesApi");

require("jest-fetch-mock").enableMocks();

describe("NotesApi", () => {
  beforeEach(() => {
    api = new NotesApi();
  });

  it("calls fetch and loads notes from the backend", (done) => {
    fetch.mockResponseOnce(
      JSON.stringify({ 0: "This note is coming from the server" })
    );
    api.loadNotes(
      (notesObject) => {
        expect(notesObject[0]).toEqual("This note is coming from the server");
        done();
      },
      () => {
        console.log("Eggor caught");
      }
    );
  });
  it("should send a post request with a new note for the backend", (done) => {
    fetch.mockResponseOnce(async (request) => {
      console.log(`Method: ${request.method}`);

      return JSON.stringify({
        0: "Egg-based humour cracks me up",
      });
    });

    api.createNote("Egg-based humour cracks me up", (response) => {
      expect(response);
      done();
    });
  });
});
