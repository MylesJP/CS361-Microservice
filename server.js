// Caller would request an integer value in the header of the request and return that index of the JSON
// ie, leetcodeserver.com/1 would return [1] of an object with the information my partner wants

const express = require("express");
const cors = require("cors");
const app = express();
PORT = 3003;

app.use(cors())

const leetCodePatterns = {
  dynamic_programming: {
    patternName: "Dynamic Programming",
    patternInfo: "Info on dynamic programming",
    patternMoreInfo: "more info on dynamic programming",
    patternSources: "outside source on dynamic programming",
  },
  arrays: {
    patternName: "Arrays",
    patternInfo: "Info on arrays",
    patternMoreInfo: "more info on arrays",
    patternSources: "outside source on arrays",
  },
  graphs: {
    patternName: "Graphs",
    patternInfo: "Info on graphs",
    patternMoreInfo: "more info on graphs",
    patternSources: "outside source on graphs",
  },
  backtracking: { 
    patternName: "Backtracking",
    patternInfo: "Info on backtracking",
    patternMoreInfo: "more info on backtracking",
    patternSources: "outside source on backtracking",
  },
  trees: { 
    patternName: "Trees",
    patternInfo: "Info on trees",
    patternMoreInfo: "more info on trees",
    patternSources: "outside source on trees",
  },
  data_structures: { 
    patternName: "Data Structures",
    patternInfo: "Info on data structures",
    patternMoreInfo: "more info on data structures",
    patternSources: "outside source on data structures",
  }
};

app.get("/get/:_name", (req, res) => {
  const obj = leetCodePatterns[req.params._name];
  if (obj) {
    res.json(obj);
  } else {
    res.status(404).send("Error. LeetCode module not found.");
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
