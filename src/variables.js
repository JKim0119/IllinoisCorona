
export const lineChartOptions = {
  elements: {
    point: {
      radius: 0
    }
  },
  scales: {
    xAxes: [
      {
        display: true
      }
    ],
    yAxes: [
      {
        display: true
      }
    ]
  },
  legend: {
    display: true
  },
  tooltips: {
    mode: 'index',
    intersect: false
  }
}

export const percentageLineChartOptions = {
  elements: {
    point: {
      radius: 0
    }
  },
  scales: {
    xAxes: [
      {
        display: true
      }
    ],
    yAxes: [
      {
        ticks: {
          callback: function (value) {
            return value + "%"
          }
        },
        display: true
      }
    ]
  },
  legend: {
    display: true
  },
  tooltips: {
    mode: 'index',
    intersect: false
  }
}