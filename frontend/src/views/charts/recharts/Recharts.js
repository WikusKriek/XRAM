import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import SimpleAreaChart from "./SimpleAreaChart"
import ComposedCharts from "./ComposedChart"
import SimpleBarChart from "./SimpleBarChart"
import SimpleLineChart from "./SimpleLineChart"
import SimpleScatterChart from "./SimpleScatterChart"
import Piechart from "./PieChart"
import RadarChart from "./RadarChart"
import RadialBar from "./RadialBarChart"
import axios from "axios"
import "../../../assets/scss/plugins/extensions/recharts.scss"

let $primary = "#7367F0",
  $success = "#28C76F",
  $info = "#00cfe8",
  $warning = "#FF9F43",
  $danger = "#EA5455",
  colors = [$primary, $success, $info, $warning, $danger]

class DevExtremeCharts extends React.Component {
  constructor(props){
    super(props);
    this.state ={charts: []};
  }
  componentDidMount(){
    axios
      .get("http://localhost:5000/notes/barchart")
      .then(response => {
        
        console.log(response.data)
        this.setState({charts:response.data})
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Recharts"
          breadCrumbParent="Charts"
          breadCrumbActive="Recharts"
        />
        <Row>
          
          <Col lg="6" md="12">
            <SimpleLineChart primary={$primary} success={$success} warning={$warning} value={this.state.charts}/>
          </Col>
          
          <Col lg="6" md="12">
            <SimpleBarChart primary={$primary} success={$success} warning={$warning} info={$info} value={this.state.charts} />
          </Col>
          <Col lg="6" md="12">
            <ComposedCharts
              primary={$primary}
              success={$success}
              danger={$danger}
              value={this.state.charts}
            />
          </Col>
          
        </Row>
      </React.Fragment>
    )
  }
}

export default DevExtremeCharts
