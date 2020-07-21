
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
    display: false
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
    display: false
  },
  tooltips: {
    mode: 'index',
    intersect: false
  }
}

export const chartColors = {
  red: 'rgb(233, 30, 99)',
  danger: 'rgb(233, 30, 99)',
  dangerTransparent: 'rgba(233, 30, 99, .8)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 180, 0)',
  green: 'rgb(34, 182, 110)',
  blue: 'rgb(68, 159, 238)',
  primary: 'rgb(68, 159, 238)',
  primaryTransparent: 'rgba(68, 159, 238, .8)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
  white: 'rgb(255, 255, 255)',

  primaryShade1: 'rgb(68, 159, 238)',
  primaryShade2: 'rgb(23, 139, 234)',
  primaryShade3: 'rgb(14, 117, 202)',
  primaryShade4: 'rgb(9, 85, 148)',
  primaryShade5: 'rgb(12, 70, 117)'
}