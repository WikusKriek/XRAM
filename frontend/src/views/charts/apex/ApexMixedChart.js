import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import Chart from "react-apexcharts"

class ApexMixedCharts extends React.Component {
  state = {
    options: {
      chart: {
        stacked: false
      },
      colors: this.props.themeColors,
      stroke: {
        width: [0, 2, 5],
        curve: "smooth"
      },
      plotOptions: {
        bar: {
          columnWidth: "50%"
        }
      },
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: [
        "01/01/2003",
        "02/01/2003",
        
       
      ],
      markers: {
        size: 0
      },
      legend: {
        offsetY: -10
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        min: 0,
        tickAmount: 5,
        title: {
          text: "Points"
        }
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " views"
            }
            return y
          }
        }
      }
    },
    series: [
      {
        name: "Total Votes",
        type: "column",
        data: this.props.total
      },
      {
        name: "Correct Answers",
        type: "area",
        data: [2,2]
      },
      {
        name: "Wrong Answers",
        type: "line",
        data: [2,2]
      }
    ]
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mixed Chart</CardTitle>
        </CardHeader>
        <CardBody>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={350}
          />
        </CardBody>
      </Card>
    )
  }
}
export default ApexMixedCharts
