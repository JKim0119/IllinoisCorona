import React, { Component } from 'react';
import { GET } from '../../api';
import { lineChartOptions, percentageLineChartOptions, chartColors } from '../../variables';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
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
			changeTotalTested: null,
			changeConfirmed: null,
			changeDeaths: null,
			changeDailyTotalTested: null,
			changeDailyConfirmed: null,
			changeDailyDeaths: null,
			bedsUsed: null,
			bedsUsedCovid: null,
			bedsAvailable: null,
			totalBeds: null,
			icuBedsUsed: null,
			icuBedsUsedCovid: null,
			icuBedsAvailable: null,
			totalICUBeds: null,
			ventilatorsUsed: null,
			ventilatorsUsedCovid: null,
			ventilatorsAvailable: null,
			totalVentilators: null
		};

		this.changeDateRange = this.changeDateRange.bind(this);
	}


	async componentDidMount() {
		this.fetchCoronaData();
		this.fetchHospitalUtil();
	}

	fetchCoronaData() {
		GET('https://j0ek2o06f1.execute-api.us-east-2.amazonaws.com/test/coronaController')
			.then((res = {}) => {
				const { dates, totalTested, confirmed, deaths, dailyTotalTested, dailyConfirmed, dailyDeaths } = res

				let copyDates = _.cloneDeep(dates)
				let copyTotalTested = _.cloneDeep(totalTested)
				let copyConfirmed = _.cloneDeep(confirmed)
				let copyDeaths = _.cloneDeep(deaths)
				let copyDailyTotalTested = _.cloneDeep(dailyTotalTested)
				let copyDailyConfirmed = _.cloneDeep(dailyConfirmed)
				let copyDailyDeaths = _.cloneDeep(dailyDeaths)

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
					changeTotalTested: copyTotalTested,
					changeConfirmed: copyConfirmed,
					changeDeaths: copyDeaths,
					changeDailyTotalTested: copyDailyTotalTested,
					changeDailyConfirmed: copyDailyConfirmed,
					changeDailyDeaths: copyDailyDeaths
				})

			}).catch(() => {
				this.setState({ coronaStatus: false })
			})
	}

	fetchHospitalUtil() {
		GET('https://cors-anywhere.herokuapp.com/https://www.dph.illinois.gov/sitefiles/COVIDHospitalRegions.json?nocache=1')
		.then((res = {}) => {
			const {statewideValues} = res
			
			this.setState({
				bedsUsed: statewideValues['TotalBedsUsed'],
				bedsUsedCovid: statewideValues['TotalCOVIDPUIInHospital'],
				bedsAvailable: statewideValues['TotalBedsAvailable'],
				totalBeds: statewideValues['TotalBeds'],
				icuBedsUsed: statewideValues['ICUBedsUsed'],
				icuBedsUsedCovid: statewideValues['ICUCovidPatients'],
				icuBedsAvailable: statewideValues['ICUOpenBeds'],
				totalICUBeds: statewideValues['ICUCapacity'],
				ventilatorsUsed: statewideValues['VentilatorsInUse'],
				ventilatorsUsedCovid: statewideValues['VentilatorsInUseCOVID'],
				ventilatorsAvailable: statewideValues['VentilatorsOpen'],
				totalVentilators: statewideValues['VentilatorCapacity'],
			})
		}).catch(() => {
			this.setState({ coronaStatus: false })
		})

	}

	changeDateRange(days) {
		let copyDates = _.cloneDeep(this.state.dates)
		let copyConfirmed = _.cloneDeep(this.state.confirmed)
		let copyDeaths = _.cloneDeep(this.state.deaths)
		let copyDailyConfirmed = _.cloneDeep(this.state.dailyConfirmed)
		let copyDailyDeaths = _.cloneDeep(this.state.dailyDeaths)
		let copyDailyTotalTested = _.cloneDeep(this.state.dailyTotalTested)

		this.setState({
			changeDates: copyDates.slice(days),
			changeConfirmed: copyConfirmed.slice(days),
			changeDeaths: copyDeaths.slice(days),
			changeDailyConfirmed: copyDailyConfirmed.slice(days),
			changeDailyDeaths: copyDailyDeaths.slice(days),
			changeDailyTotalTested: copyDailyTotalTested.slice(days)
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
			let percentCases = []
			for (let i = 0; i < this.state.changeDailyConfirmed.length; i++) {
				percentCases.push((100 * this.state.changeDailyConfirmed[i] / this.state.changeDailyTotalTested[i]).toFixed(2))
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
						}
					]
				},
				options: lineChartOptions
			};

			const deathLine = {
				data: {
					labels: this.state.changeDates,
					datasets: [
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
			
			const dailyTestedLine = {
				data: {
					labels: this.state.changeDates,
					datasets: [
						{
							label: 'Daily Tested',
							data: this.state.changeDailyTotalTested,
							borderColor: chartColors.blue,
							pointBackgroundColor: chartColors.blue,
							pointBorderColor: chartColors.blue,
							borderWidth: 2
						}
					]
				}
			};

			const dailyConfirmedLine = {
				data: {
					labels: this.state.changeDates,
					datasets: [
						{
							label: 'Daily Confirmed Cases',
							data: this.state.changeDailyConfirmed,
							borderColor: chartColors.blue,
							pointBackgroundColor: chartColors.blue,
							pointBorderColor: chartColors.blue,
							borderWidth: 2
						}
					]
				}
			};

			const dailyDeathLine = {
				data: {
					labels: this.state.changeDates,
					datasets: [
						{
							label: 'Daily Deaths',
							data: this.state.changeDailyDeaths,
							borderColor: chartColors.red,
							pointBackgroundColor: chartColors.red,
							pointBorderColor: chartColors.red,
							borderWidth: 2
						}
					]
				}
			};


			const percentLine = {
				data: {
					labels: this.state.changeDates,
					datasets: [
						{
							label: 'Percent',
							data: percentCases,
							borderColor: chartColors.blue,
							pointBackgroundColor: chartColors.blue,
							pointBorderColor: chartColors.blue,
							borderWidth: 2
						}
					]
				}
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
						<Button onClick={() => this.changeDateRange(-7)} variant="light">1 Week</Button>{' '}
						<Button onClick={() => this.changeDateRange(-30)} variant="light">1 Month</Button>{' '}
						<Button onClick={() => this.changeDateRange(-90)} variant="light">3 Months</Button>{' '}
						<Button onClick={() => this.changeDateRange(0)} variant="light">All</Button>{' '}
					</div>

					<br></br>

					<Row>
						<Col md={6} sm={12}>
							<Card>
								<CardHeader>Confirmed Cases (Daily)</CardHeader>
								<CardBody>
									<div className="full-bleed">
										<Line
											data={dailyConfirmedLine.data}
											width={2068}
											height={846}
											options={lineChartOptions}
										/>
									</div>
								</CardBody>
							</Card>
						</Col>
						<Col md={6} sm={12}>
							<Card>
								<CardHeader>Confirmed Deaths (Daily)</CardHeader>
								<CardBody>
									<div className="full-bleed">
										<Line
											data={dailyDeathLine.data}
											width={2068}
											height={846}
											options={lineChartOptions}
										/>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
					
					<Row>
						<Col md={6} sm={12}>
							<Card>
								<CardHeader>Tested (Daily)</CardHeader>
								<CardBody>
									<div className="full-bleed">
										<Line
											data={dailyTestedLine.data}
											width={2068}
											height={846}
											options={lineChartOptions}
										/>
									</div>
								</CardBody>
							</Card>
						</Col>
						<Col md={6} sm={12}>
							<Card>
								<CardHeader>Confirmed Cases/Tested (Daily)</CardHeader>
								<CardBody>
									<div className="full-bleed">
										<Line
											data={percentLine.data}
											width={2068}
											height={846}
											options={percentageLineChartOptions}
										/>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>

					<Row>
						<Col md={6} sm={12}>
							<Card>
								<CardHeader>Confirmed Cases (Cumulative)</CardHeader>
								<CardBody>
									<div className="full-bleed">
										<Line
											data={confirmedLine.data}
											width={2068}
											height={846}
											options={lineChartOptions}
										/>
									</div>
								</CardBody>
							</Card>
						</Col>
						<Col md={6} sm={12}>
							<Card>
								<CardHeader>Confirmed Deaths (Cumulative)</CardHeader>
								<CardBody>
									<div className="full-bleed">
										<Line
											data={deathLine.data}
											width={2068}
											height={846}
											options={lineChartOptions}
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
