// IMPORT REQUIRED MODULES:
//const Pool = require('pg').Pool;
const { Pool } = require('pg');


// DEFINE DATABASE:
const pool = new Pool({
  user: 'robinreistadfiske',
  host: 'localhost',
  database: 'step_solutions',
  password: '',
  port: 5432
});

// SERVICE FUNCTIONS:
//get all rows:
const getAllRows = async () => {
  const queryString=`
    SELECT 
      *
    FROM 
      test_table 
    ;  
  `;

  const response = await pool.query(queryString);
  return response.rows;
}

const getAllAverages = async () => {
  const queryString= `
  SELECT 
    AVG(TO_NUMBER(Global_active_power, '999999999999.999')) AS Global_active_power, 
    AVG(TO_NUMBER(Global_reactive_power, '999999999999.999')) AS Global_reactive_power,  
    AVG(TO_NUMBER(Global_intensity, '999999999999.999')) AS Global_intensity,  
    AVG(TO_NUMBER(Sub_metering_1, '999999999999.999')) AS Sub_metering_1, 
    AVG(TO_NUMBER(Sub_metering_2, '999999999999.999')) AS Sub_metering_2, 
    AVG(TO_NUMBER(Sub_metering_3, '999999999999.999')) AS Sub_metering_3
  FROM power_usage;
  `;

  const response = await pool.query(queryString);
  return response.rows;
}

const getYearAverages = async (year) => {
  const queryString= `
  SELECT 
    AVG(TO_NUMBER(Global_active_power, '999999999999.999')) AS Global_active_power, 
    AVG(TO_NUMBER(Global_reactive_power, '999999999999.999')) AS Global_reactive_power,  
    AVG(TO_NUMBER(Global_intensity, '999999999999.999')) AS Global_intensity,  
    AVG(TO_NUMBER(Sub_metering_1, '999999999999.999')) AS Sub_metering_1, 
    AVG(TO_NUMBER(Sub_metering_2, '999999999999.999')) AS Sub_metering_2, 
    AVG(TO_NUMBER(Sub_metering_3, '999999999999.999')) AS Sub_metering_3
  FROM power_usage
  WHERE
    right(Date, 4) = $1;
  `;
  const response = await pool.query(queryString, [year]);
  return response.rows;
}


async function getPowerUsage(timestamp){
  if(typeof timestamp != 'string'){return}
  const sql = `
    SELECT 
      *
    FROM 
      test_table
    WHERE 
      Date = $1 AND
      Time = $2`
  let powerUsage = await pool.query(sql, [timestamp]);
  return powerUsage;
}


const getRowsByDate = async date => {
  const queryString=`
    SELECT 
    *
  FROM 
    test_table
  WHERE 
    Date = $1
  `;

  const response  = await pool.query(queryString, [date]);
  return response.rows;
}


const getRowsByTime = async time => {
  const queryString=`
    SELECT 
      *
    FROM 
      test_table
    WHERE 
      Time = $2
  `;

  const response  = await pool.query(queryString, [time]);
  return response;
}


// EXPORT MODULE TO QUERIES:
module.exports = {
  getAllRows,
  getAllAverages,
  getYearAverages,
  getPowerUsage,
  getRowsByDate,
  getRowsByTime
}