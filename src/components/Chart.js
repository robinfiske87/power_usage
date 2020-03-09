import React, {Component} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getRowsAverage, getRowsYearAverage } from '../services/rows';
import { parseToFloat, makeDataArray } from '../services/formatData';



class Chart extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      year: "",
      filteredData: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: []
          }
        ],
      },
      isLoading: true,
      error: null,
    }
  }



  handleInputChange = event => {
    const year = event.target.value;
    this.setState({
      year: year 
    })
  };

  querySubmit = async event => {
    event.preventDefault();

    const year = this.state.year;

    const rowsByYear = await getRowsYearAverage(year)
    
    const rowResult = parseToFloat(rowsByYear);
      console.log(rowResult);

      const rowValues = makeDataArray(rowResult);
      console.log(rowValues);

      this.setState({
        chartData: {
          labels: [
            'Global Active Power', 'Global Reactive Power', 'Global Intensity', 'Sub Metering 1', 'Sub Metering 2', 'Sub Metering 3'],
          datasets: 
            [{
              label: 'Power usage',
              data: rowValues[0],
              backgroundColor: [
                'rgba(255, 99, 132, 0.6',
                'rgba(54, 162, 235, 0.6',
                'rgba(255, 206, 86, 0.6',
                'rgba(75, 192, 192, 0.6',
                'rgba(153, 102, 255, 0.6',
                'rgba(255, 169, 64, 0.6'
              ]
            }],
         
         }, isLoading: false
      })

  }



  async componentDidMount() {   
    try {
      const tableRows = await getRowsAverage();
    
      const rowResult = parseToFloat(tableRows);

      const rowValues = makeDataArray(rowResult);

      this.setState({
        chartData: {
          labels: [
            'Global Active Power', 'Global Reactive Power', 'Global Intensity', 'Sub Metering 1', 'Sub Metering 2', 'Sub Metering 3'],
          datasets: 
            [{
              label: 'Power usage',
              data: rowValues[0],
              backgroundColor: [
                'rgba(255, 99, 132, 0.6',
                'rgba(54, 162, 235, 0.6',
                'rgba(255, 206, 86, 0.6',
                'rgba(75, 192, 192, 0.6',
                'rgba(153, 102, 255, 0.6',
                'rgba(255, 169, 64, 0.6'
              ]
            }],
         
         }, isLoading: false
          });
         } catch (error) {
            this.setState({
              error: error,
              isLoading: false
            })
          }
        }

  render() {
  const {isLoading, error} = this.state;

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


    return(
      <React.Fragment>
        <Container className="graph-card">
          <div className="graph-link-container">
            <Link 
              to="/home"
              className="graph-link"
              >
              Do you want to return to the overview?
            </Link>
          </div>

          <div className="searchForm">
            <form>
              <select className="chart-input"
                onChange={this.handleInputChange}>
                  <option value="*">All</option>
                  {Array.from(new Array(5)).map((el, i) => (
                    <option value={i+2006}>{i+2006}</option>
                  ))}
                </select>
              <button onClick={this.querySubmit}>Select year</button>
            </form>
            <div>{this.state.filteredData.map(i => <p>{i.name}</p>)}</div>
          </div>
          
          <div className="chart">
             <Container className="row-card" key={this.state.chartData.datasets[0].data[0].time}> 
              {/* Date: {this.state.timestamp[0].date} | Time: {this.state.timestamp[0].time.substring(0, this.state.timestamp[0].time.length -3)} */}
              <Bar
                data={this.state.chartData}
                  options={{
                    maintainAspectRatio: true,
                    title:{
                      display: true,
                      text:'Power usage in a household',
                      fontSize: 25
                    },
                legend:{
                  display: false,
                  position: 'right'
                }
              }}
            />
            </Container>
          </div>
        </Container>
      </React.Fragment>
      
    )
  } 
  }

export default Chart;