class NotesApi {
  async loadNotes(callback, errorCallback) {
    try {
      const response = await fetch("http://localhost:3000/notes");
      const data = await response.json();
      callback(data);
    } catch (error) {
      errorCallback();
    }
  }
  createNote(noteMessage, callback) {
    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: noteMessage }),
    })
      .then((response) => response.json())
      .then((data) => callback(data));
  }
}

module.exports = NotesApi;
