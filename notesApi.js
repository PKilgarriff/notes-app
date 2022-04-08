class NotesApi {
  async loadNotes(callback, errorCallback) {
    try {
      const response = await fetch("http://localhost:3000/notes");
      const data = await response.json();
      callback(data);
    } catch (error) {
      errorCallback("Cannot load 🥚🥚🥚, coneggtion scrambled");
    }
  }
  async createNote(noteMessage, callback, errorCallback) {
    if (noteMessage === "") {
      errorCallback("Cannot create an empty Egg");
    } else {
      try {
        const response = await fetch("http://localhost:3000/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: noteMessage }),
        });
        const data = await response.json();
        console.log(data);
        callback(data);
      } catch (error) {
        console.log(error.message, error.name);
        errorCallback("Cannot create Egg, conneggtion scrambled");
      }
    }
  }
}

module.exports = NotesApi;
