import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import { getRows } from '../services/rows';





class Feed extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      power_usage: [],
      isLoading: false,
      error: null,
    }
  }



  async componentDidMount() {   
    this.setState({
      isLoading: true
    })
    try {
      const tableRows = await getRows();
      this.setState({
        power_usage: tableRows,
        isLoading: false
      })
    } catch (error) {
      this.setState({
        error: error,
        isLoading: false
      })
    }
  }

  render() {
  const {power_usage, isLoading, error} = this.state;

    if (error) {
      return (
      <div>Unable to fetch data</div>
      );
    }

    if (isLoading) {
      return (
        <div>Loading data...</div>
      );
    }

    const dataRows = power_usage
    .map(({ date, time, global_active_power, global_reactive_power, voltage, global_intensity, sub_metering_1, sub_metering_2, sub_metering_3 }) => {
      if(time && date) {
        return (
          <React.Fragment key={time}>
            <Container className="row-card">
            <p>
              <span className="row-date">{date}</span> |
              <span className="row-timestamp">{time}</span>
            </p>
        <p className="row-values">Global Active Power: {global_active_power} | Global Reactive Power: {global_reactive_power} | Voltage: {voltage} | Global Intensity: {global_intensity}</p>
        <p className="row-values">Sub Metering 1: {sub_metering_1} | Sub Metering 2: {sub_metering_2} | Sub Metering 3: {sub_metering_3}</p>
            </Container>
          </React.Fragment>
        );
      } else {
        return(<div>No time period was given</div>)
      }
      
    })

    return(
      <React.Fragment>
        <Container className="graph-card">
          <div className="graph-link-container">
            <Link 
              to="/chart"
              className="graph-link"
                >Do you want to make a chart?
            </Link>
          </div>
          <div className="graph-link-container">
            <button>Dropdown selectors</button>
          </div>
          <div>
            {dataRows}
          </div>
        </Container>
      </React.Fragment>
      
    )
  } 
}

export default Feed;