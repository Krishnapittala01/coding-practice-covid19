const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "covid19India.db");

let database = null;
const intializeDBToServer = async () => {
  try {
    datbase = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error : ${e.message}`);
    process.exit(1);
  }
};
intializeDBToServer();

const convertDBObjectToResponse = (dbOject) => {
  return {
    stateId: dbOject.state_id,
    stateName: dbOject.state_name,
    population: dbOject.population,
  };
};

// API 1
app.get("/states/", async (request, response) => {
  const getStatesQuery = `
    SELECT * FROM state;`;
  const statesArray = await database.all(getStatesQuery);
  response.send(
    statesArray.map((eachState) => convertDBObjectToResponse(eachState))
  );
});
