// IMPORT REQUIRED MODULES:
const services = require('./services/services');


// DEFINE ENDPOINT CALLBACKS:
//get all rows:
const getRows = async (request, response) => {
  try {
    const rows = await services.getAllRows();
    return response.status(200).json(rows);
  }
  catch(error) {
    console.log(error);
    response.status(500).send("Something went wrong on the server");
  }
};

const getAverageByRows = async (request, response) => {
  try {
    const rowsAverage = await services.getAllAverages();
    return response.status(200).json(rowsAverage);
  }
  catch(error) {
    response.status(500).send("Something went wrong on the server");
  }
}

const getAverageByYear = async (request, response) => {
  try {
    const year = request.params.year;
    const rowsAverage = await services.getYearAverages(year);
    return response.status(200).json(rowsAverage);
  }
  catch(error) {
    response.status(500).send("Something went wrong on the server");
  }
}

//get rows by date:
const getRowsByDate = async (request, response) => {
  try {
    const date = request.body.date;
    const dateRows = await services.getRowsByDate(date);
    response.status(200).json(dateRows);
  } 
  catch (error) {
    console.log(error);
    response.status(500).send("Something went wrong on the server");
  }
};

//get rows by time:
const getRowsByTime = async (request, response) => {
  try {
    const time = request.params.Time;
    const timeRows = await services.getRowsByTime(time);
    response.status(200).json({
      error: null,
      result: timeRows
    });
  } 
  catch (error) {
    console.log(error);
    response.status(404).json({
      error: `Error - Could not find times`,
      result: null
    });
  }
};



// EXPORT MODULES TO SERVER:
module.exports = {
  getRows,
  getAverageByRows,
  getRowsByDate,
  getRowsByTime,
  getAverageByYear
};