const API_URL = 'http://localhost:3456/api';

export const getRows = async() => {
  const response = await fetch(`${API_URL}/session`);
  const rows = await response.json();
  return rows;
}

export const getRowsAverage = async() => {
  const response = await fetch(`${API_URL}/session/average`);
  const rowsAverage = await response.json();
  return rowsAverage;
}

export const getRowsByDate = async date => {
  const response = await fetch(`${API_URL}/session/date`, {
    method: 'post',
    body: JSON.stringify({date}),
    headers: {'Content-Type': 'application/json'}
  })
  const result = await response.json();
  return result;
}

export const getRowsByTime = async time => {
  const response = await fetch(`${API_URL}/session/${time}`)
  const result = await response.json();
  return result;
}



