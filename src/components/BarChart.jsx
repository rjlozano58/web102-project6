import React from 'react'
import {Bar} from 'react-chartjs-2'

function BarChart(props) {
  return (
    <Bar data={props.chartData}/>
  )
}

export default BarChart