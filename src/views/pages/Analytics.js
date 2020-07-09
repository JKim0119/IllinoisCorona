import React, { Component } from 'react';
import { GET } from '../../api';
import {
	Row,
	Col,
	Card,
	CardHeader,
	CardBody
} from 'reactstrap';
import { Line } from 'react-chartjs-2';
import Button from 'react-bootstrap/Button';
import _ from "lodash";

export default class AnalyticsPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			coronaStatus: null,
			dates: null,
			totalTested: null,
			confirmed: null,
			deaths: null,
			dailyTotalTested: null,
			dailyConfirmed: null,
			dailyDeaths: null,
			changeDates: null,
			changeConfirmed: null,
			changeDeaths: null
		};

		this.changeDateRange = this.changeDateRange.bind(this);
	}


	async componentDidMount() {
		this.fetchCoronaData();
	}

	fetchCoronaData() {
		GET('https://j0ek2o06f1.execute-api.us-east-2.amazonaws.com/test/coronaController')
			.then((res = {}) => {
				const { dates, totalTested, confirmed, deaths, dailyTotalTested, dailyConfirmed, dailyDeaths } = res
				
				let copyDates = _.cloneDeep(dates)
				let copyConfirmed = _.cloneDeep(confirmed)
				let copyDeaths = _.cloneDeep(deaths)
				this.setState({
					coronaStatus: true,
					dates: dates,
					totalTested: totalTested,
					confirmed: confirmed,
					deaths: deaths,
					dailyTotalTested: dailyTotalTested,
					dailyConfirmed: dailyConfirmed,
					dailyDeaths: dailyDeaths,
					changeDates: copyDates,
					changeConfirmed: copyConfirmed,
					changeDeaths: copyDeaths
				})
			}).catch(() => {
				this.setState({ coronaStatus: false })
			})
	}

	changeDateRange(days) {
		let copyDates = _.cloneDeep(this.state.dates)
		let copyConfirmed = _.cloneDeep(this.state.confirmed)
		let copyDeaths = _.cloneDeep(this.state.deaths)
		
		this.setState({
			changeDates: copyDates.slice(days),
			changeConfirmed: copyConfirmed.slice(days),
			changeDeaths: copyDeaths.slice(days)
		})
	}

	render() {

		if (this.state.coronaStatus === null) {
			return <div>Loading...</div>
		}
		else if (this.state.coronaStatus === false) {
			return <div>Error</div>
		}
		else {
			const chartColors = {
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
			};

			const lineChartOptions = {
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

			const percentageLineChartOptions = {
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

			let percentCases = []
			for (let i = 1; i < this.state.dailyConfirmed.length; i++) {
				percentCases.push((100 * this.state.dailyConfirmed[i] / this.state.dailyTotalTested[i]))
			}

			const confirmedLine = {
				data: {
					labels: this.state.changeDates,
					datasets: [
						{
							label: 'Confirmed Cases',
							data: this.state.changeConfirmed,
							borderColor: chartColors.blue,
							pointBackgroundColor: chartColors.blue,
							pointBorderColor: chartColors.blue,
							borderWidth: 2
						},
						{
							label: 'Deaths',
							data: this.state.changeDeaths,
							borderColor: chartColors.red,
							pointBackgroundColor: chartColors.red,
							pointBorderColor: chartColors.red,
							borderWidth: 2
						}
					]
				},
				options: lineChartOptions
			};


			const percentLine = {
				data: {
					labels: this.state.dates.slice(1),
					datasets: [
						{
							label: '',
							data: percentCases,
							borderColor: chartColors.blue,
							pointBackgroundColor: chartColors.blue,
							pointBorderColor: chartColors.blue,
							borderWidth: 2
						}
					]
				},
				options: percentageLineChartOptions
			};

			return (
				<div>
					<div className="m-b">
						<h2>Illinois Coronavirus Data</h2>
						<p className="text-muted">
							Here are a few graphs on how Illinois has been doing with coronavirus.
						</p>
					</div>
					<div>
						<Button onClick={() => this.changeDateRange(-7)} variant="primary">1 Week</Button>{' '}
						<Button onClick={() => this.changeDateRange(-30)} variant="primary">1 Month</Button>{' '}
						<Button onClick={() => this.changeDateRange(-90)} variant="primary">3 Months</Button>{' '}
						<Button onClick={() => this.changeDateRange(0)} variant="primary">All</Button>{' '}
					</div>

					<Row>
						<Col md={6} sm={12}>
							<Card>
								<CardHeader>Total Number of Confirmed Cases/Deaths</CardHeader>
								<CardBody>
									<div className="full-bleed">
										<Line
											data={confirmedLine.data}
											width={2068}
											height={846}
											options={confirmedLine.options}
										/>
									</div>
								</CardBody>
							</Card>
						</Col>
						<Col md={6} sm={12}>
							<Card>
								<CardHeader>Daily Confirmed Cases/Daily Tested</CardHeader>
								<CardBody>
									<div className="full-bleed">
										<Line
											data={percentLine.data}
											width={2068}
											height={846}
											options={percentLine.options}
										/>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>

				</div>
			);

		}
	}
}
