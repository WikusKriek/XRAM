import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import Chart from "react-apexcharts"

class ApexDonutCharts extends React.Component {
  state = {
    options: {
      colors: this.props.themeColors,
      labels: this.props.labels,
      legend: {
        itemMargin: {
          horizontal: 2
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 350
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    },
    series: this.props.series,
    chartname:this.props.chartname
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
            type="donut"
            height={350}
          />
        </CardBody>
      </Card>
    )
  }
}
export default ApexDonutCharts
