import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import Chart from "react-apexcharts"

class ApexRadialCharts extends React.Component {
  state = {
    options: {
      colors: this.props.themeColors,
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px"
            },
            total: {
              show: true,
              label: "Total",
              
              formatter: function(w) {
                
                return 
              }
            }
          }
        }
      },
      labels: this.props.labels
    },
    series: this.props.series,
    chartname:this.props.chartname,
    totalvotes:this.props.totalvotes,
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{this.state.chartname}</CardTitle>
        </CardHeader>
        <CardBody>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="radialBar"
            height={350}
          />
        </CardBody>
      </Card>
    )
  }
}
export default ApexRadialCharts
