import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import ApexLineChart from "./ApexLineChart"
import ApexAreaChart from "./ApexAreaCharts"
import ApexColumnChart from "./ApexColumnCharts"
import ApexBarChart from "./ApexBarChart"
import ApexMixedChart from "./ApexMixedChart"
import ApexCandlestickChart from "./ApexCandlestickChart"
import ApexBubbleChart from "./ApexBubbleChart"
import ApexScatterChart from "./ApexScatterChart"
import ApexHeatmapChart from "./ApexHeatmapChart"
import ApexPieChart from "./ApexPieChart"
import ApexDonutChart from "./ApexDonutChart"
import ApexRadialChart from "./ApexRadialChart"
import ApexRadarChart from "./ApexRadarChart"
import "../../../assets/scss/plugins/charts/apex-charts.scss"
import axios from "axios"
import PropTypes from 'prop-types'

let $primary = "#7367F0",
  $success = "#28C76F",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $info = "#00cfe8",
  $label_color_light = "#dae1e7"

let themeColors = [$primary, $success, $danger, $warning, $info]
 
class ApexCharts extends React.Component {

  constructor(props){
    super(props);
    this.state ={charts: []};
    
}
componentDidMount(){
  axios
      .get("http://localhost:5000/notes/piechart")
      .then(response => {
        //console.log(Object.values(response.data))
        
        this.setState({charts:response.data})
      })
      .catch(err => console.log(err))

  }

  pieList(){
        
    return this.state.charts.map (currentchart =>{
        const {classes} = this.props;

        
        return(
          <ApexPieChart themeColors={themeColors} key={currentchart.textContent} chartname={currentchart.question} series={currentchart.options.map(({ vote_percentage}) => vote_percentage)} labels={currentchart.options.map(({ text}) => text)}/>
          
    )}
)}

donutList(){
        
  return this.state.charts.map (currentchart =>{
      const {classes} = this.props;

      
      return(
        <ApexDonutChart  themeColors={themeColors} key={currentchart.textContent} chartname={currentchart.question} series={currentchart.options.map(({ vote_percentage}) => vote_percentage)} labels={currentchart.options.map(({ text}) => text)}/>
        
  )}
)}

radiallist(){
        
  return this.state.charts.map (currentchart =>{
      const {classes} = this.props;

      
      return(
        <ApexRadialChart  themeColors={themeColors}  key={currentchart.textContent} totalvotes={currentchart.total_voter_count} chartname={currentchart.question} series={currentchart.options.map(({ vote_percentage}) => vote_percentage)} labels={currentchart.options.map(({ text}) => text)}/>
        
  )}
)}



  render() {

    const {classes} = this.props
   
 
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Apex Charts"
          breadCrumbParent="Charts"
          breadCrumbActive="Apex"
        />
        <Row>
          
          
          
          <Col lg="6" sm="12">
          {this.pieList()}
          </Col>
        
        
  
          <Col lg="6" sm="12">
         { this.donutList()}
          </Col>
          <Col lg="6" sm="12">
          {this.radiallist()}
          </Col>
         
        </Row>
      </React.Fragment>
    )
  }
}
ApexCharts.propTypes = {
  classes: PropTypes.object,
}
export default ApexCharts
