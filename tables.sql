CREATE TABLE power_usage 
(
  Date CHAR(10),
  Time CHAR(8),
  Global_active_power VARCHAR(10),
  Global_reactive_power VARCHAR(10),
  Voltage VARCHAR(10),
  Global_intensity VARCHAR(10),
  Sub_metering_1 VARCHAR(10),
  Sub_metering_2 VARCHAR(10),
  Sub_metering_3 VARCHAR(10)
);

CREATE TABLE test_table 
(
  Date CHAR(10),
  Time CHAR(8),
  Global_active_power DECIMAL(10,3),
  Global_reactive_power DECIMAL(10,3),
  Voltage DECIMAL(10,3),
  Global_intensity DECIMAL(10,3),
  Sub_metering_1 DECIMAL(10,3),
  Sub_metering_2 DECIMAL(10,3),
  Sub_metering_3 DECIMAL(10,3)
);

UPDATE power_usage
SET  Global_active_power = '0'
WHERE Global_active_power = '?'; 

UPDATE power_usage
SET  Global_reactive_power = '0'
WHERE Global_reactive_power = '?'; 

UPDATE power_usage
SET  voltage = '0'
WHERE voltage = '?';  

UPDATE power_usage
SET  Global_intensity = '0'
WHERE Global_intensity = '?';

UPDATE power_usage
SET  Sub_metering_1 = '0'
WHERE Sub_metering_1 = '?';  

UPDATE power_usage
SET Sub_metering_2 = '0'
WHERE Sub_metering_2 = '?'; 

UPDATE power_usage
SET Sub_metering_3 = '0'
WHERE Sub_metering_3 = '?';  
 
SELECT 
  AVG(TO_NUMBER(Global_active_power, '999999999999.999')) AS Global_active_power, 
  AVG(TO_NUMBER(Global_reactive_power, '999999999999.999')) AS Global_reactive_power,  
  AVG(TO_NUMBER(Global_intensity, '999999999999.999')) AS Global_intensity,  
  AVG(TO_NUMBER(Sub_metering_1, '999999999999.999')) AS Sub_metering_1, 
  AVG(TO_NUMBER(Sub_metering_2, '999999999999.999')) AS Sub_metering_2, 
  AVG(TO_NUMBER(Sub_metering_3, '999999999999.999')) AS Sub_metering_3
FROM power_usage;


COPY test_table FROM '/Users/robinreistadfiske/Desktop/git/step-solutions/test_table.txt' DELIMITER ';' CSV HEADER;

COPY power_usage FROM '/Users/robinreistadfiske/Desktop/git/household_power_consumption.txt' DELIMITER ';' CSV HEADER;
