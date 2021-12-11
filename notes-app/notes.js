const fs = require("fs");
const chalk = require("chalk");

const error = chalk.bold.red;
const success = chalk.bold.green;

const getNotes = () => {
  return "Your Notes ..";
};

//ADD NOTE

const addNote = (title, body) => {
  const notes = loadNotes();

  //checking duplicate
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(success("New note added!"));
  } else {
    console.log(error("Note title taken"));
  }
};

//REMOVE NOTE
const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => {
    return note.title !== title;
  });

  if (notes.length > notesToKeep.length) {
    console.log(success("Note removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(error("No note found!"));
  }
};

//LISTING NOTES
const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.inverse("Your Notes"));

  notes.forEach((note) => {
    console.log(chalk.blue(note.title));
  });
};

//READING A NOTE
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(chalk.blue(note.body));
  } else {
    console.log(error("Note not found!"));
  }
};

//SAVE NOTES
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

//LOAD NOTES
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};

// //ADD NOTE ALTERNATIVE
// const addNote = (title, body) => {
//   const notes = loadNotes();

//   //duplicate function
//   const duplicateNotes = notes.filter((note) => note.title === title);

//   //if there is no duplicate then it will push the new title and body the the notes array.
//   if (duplicateNotes.length === 0) {
//     notes.push({
//       title: title,
//       body: body,
//     });
//     saveNotes(notes);
//     console.log(success("New note added!"));
//   } else {
//     console.log(error("Note title taken!"));
//   }
// };
