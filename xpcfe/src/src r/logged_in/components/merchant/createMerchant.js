import React, { Component } from 'react';
import {
	Grid,
	Typography,
	Paper,
	Toolbar,
	withStyles,
	TextField,
	IconButton,
	Button,
	Box,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import dummyImg from '../../../shared/assets/png/dummyimage1.png';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {
	AsynchronousMultiple,
	dataToSendToParent,
} from '../../../shared/components/AutoCompleteTextField';
import Table from '../dashboard/Table';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import BackupIcon from '@material-ui/icons/Backup';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import Popup from 'reactjs-popup';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		marginLeft: 10,
	},
	paper: {
		padding: theme.spacing(2),

		color: theme.palette.text.secondary,
	},
	leftSide: {
		marginBottom: 20,
		marginLeft: 16,
		marginTop: 16,
	},

	rightSide: {
		width: 'auto',
		marginTop: -20,
		marginLeft: 20,
	},
	gridTypo: {
		width: 240,
		fontWeight: 900,

		alignSelf: 'center',
		fontWeight: 700,
	},
	image: {
		width: 300,
		height: 200,
	},
	input: {
		display: 'none',
	},
	textField: {
		width: 250,
	},
	errorWarning: {
		fontWeignt: 500,
		alignLeft: 'center',
		color: '#E61919',
		display: 'inline',
		fontSize: 16,
		marginLeft: 10,
	},
});
let postDataJsonStep1 = {};
let postDataJsonStep2 = {};
let postDataJsonStep3 = {};
const step1 = [
	{
		id: 'partnerRegisteredCompanyName',
		typo: 'Partner Registered Company Name',
		placeHold: 'Registered Name',
		data: null,
	},
	{
		id: 'PartnerBrandName',
		typo: 'Partner Brand Name',
		placeHold: 'Brand Name',
		data: null,
	},
	{
		id: 'CompanyRegistrationID',
		typo: 'Company Registration ID',
		placeHold: 'Registration ID ',
		data: null,
	},
	{
		id: 'CompanyTAXID',
		typo: 'Company TAX ID',
		placeHold: 'GST?VAT ID',
		data: null,
	},
	{
		id: 'SelectLanguage',
		typo: 'Select Language',
		placeHold: 'Hindi',
		data: null,
	},
	{
		id: 'MainDomain',
		typo: 'Main Domain',
		placeHold: 'www.abc.com',
		data: null,
	},
];
const step2 = [
	{
		id: 'CountryPresentIn',
		typo: 'Country Present In',
		placeHold: 'Country',
		data: null,
	},
	{
		id: 'StatesPresentIn',
		typo: 'States Present In',
		placeHold: 'All State',
		data: null,
	},
	{
		id: 'MainProduct',
		typo: 'Main Product',
		placeHold: 'Add Product Type',
		data: null,
	},
	{
		id: 'InsuranceProductInterestedtoSell',
		typo: 'Insurance Product Interested to Sell',
		placeHold: 'Product name',
		data: null,
	},
];
const step3_1 = [
	{
		id: 'selectCountry',
		typo: 'Select Country',
		placeHold: 'Country Name',
		data: null,
	},
	{
		id: 'SalesHeadName',
		typo: 'Sales Head Name',
		placeHold: 'Full Name',
		data: null,
	},

	{
		id: 'SalesHeadEmailID',
		typo: 'Sales Head Email ID',
		placeHold: 'Email ID',
		data: null,
	},
	{
		id: 'AdminName',
		typo: 'Admin Name',
		placeHold: 'Full Name',
		data: null,
	},
	{
		id: 'AdminEmailID',
		typo: 'Admin Email ID',
		placeHold: 'Email ID',
		data: null,
	},
];
const step3_2 = [
	{
		id: 'selectCountry',
		typo: 'Select Country',
		placeHold: 'Download Template',
		data: null,
	},
];

let compiledData = {};

class CreateMerchant extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isStep1: true,
			isStep2: false,
			isStep3_1: false,
			isStep3_2: false,
			isNext: false,
			isConfirm: true,
			isSubmit: false,
			isCreateAccount: false,
			isShowTable: false,
			isSubmitDisabled: false,
			isShowMerchantId: false,
			// validator step1
			isConfirmDisabled: true,
			nameError: true,
			domainError: true,
			partnerRegisteredCompanyName: true,
			PartnerBrandName: true,
			CompanyRegistrationID: true,
			CompanyTAXID: true,
			MainDomain: true,
			SelectLanguage: true,
			// validator step2
			CountryPresentIn: true,
			StatesPresentIn: true,
			MainProduct: true,
			InsuranceProductInterestedToSell: true,

			//Validator step3
			SalesHeadName: true,
			SalesHeadEmailID: true,
			AdminName: true,
			AdminEmailID: true,
			isNextDisabled: true,
			emailError: true,
			merchantIdAssigned: 'Amazon',
		};
	}
	// dataCompile() {
	// 	step1.map((item) => {
	// 		postDataJsonStep1[id] = item.data;
	// 	});
	// 	step2.map((item) => {
	// 		postDataJsonStep2[id] = item.data;
	// 	});
	// 	step3.map((item) => {
	// 		postDataJsonStep3[id] = item.data;
	// 	});
	// }
	async getData() {
		fetch('http://jsonplaceholder.typicode.com/todos');

		try {
			let result = await fetch('http://jsonplaceholder.typicode.com/todos')
				.then((res) => res.json())
				.then((data) => {
					this.setState({ todos: data });
					console.log(this.state.id);
				})
				.catch(console.log);
			console.log('Result' + result);
		} catch (e) {
			console.log(e);
		}
	}
	async postData(data) {
		try {
			let result = await fetch(
				'https://webhook.site/f38a3110-07c3-4e98-8b17-879e3c6afa6a',
				{
					method: 'post',
					mode: 'no-cors',
					headers: {
						Accept: 'application/json',
						'Content-type': 'application/json',
					},
					body: JSON.stringify(data),
				},
			);
			console.log('Result' + result);
		} catch (e) {
			console.log(e);
		}
	}
	// validator
	handleChangeStep1(e) {
		const target = e.target;
		const name = target.name;

		this.setState({
			[name]: target.value,
		});
		if (e.target.name === 'partnerRegisteredCompanyName') {
			if (this.validateName(e.target.value) === false) {
				this.setState({
					partnerRegisteredCompanyName: false,
				});
			} else {
				this.setState({
					partnerRegisteredCompanyName: true,
				});
			}
			// console.log('error1 ' + this.state.partnerRegisteredCompanyName);
		} else if (e.target.name === 'PartnerBrandName') {
			if (this.validateName(e.target.value) === false) {
				this.setState({
					PartnerBrandName: false,
				});
			} else {
				this.setState({
					PartnerBrandName: true,
				});
			}
			// console.log('error2 ' + this.state.PartnerBrandName);
		} else if (e.target.name === 'CompanyRegistrationID') {
			if (this.validateName(e.target.value) === false) {
				this.setState({
					CompanyRegistrationID: false,
				});
			} else {
				this.setState({
					CompanyRegistrationID: true,
				});
			}
			// console.log('error3 ' + this.state.CompanyRegistrationID);
		} else if (e.target.name === 'CompanyTAXID') {
			if (this.validateName(e.target.value) === false) {
				this.setState({
					CompanyTAXID: false,
				});
			} else {
				this.setState({
					CompanyTAXID: true,
				});
			}
		} else if (e.target.name === 'SelectLanguage') {
			if (this.validateName(e.target.value) === false) {
				this.setState({
					SelectLanguage: false,
				});
			} else {
				this.setState({
					SelectLanguage: true,
				});
			}
		} else if (e.target.name === 'MainDomain') {
			if (this.validateDomain(e.target.value) === false) {
				this.setState({
					MainDomain: false,
				});
			} else {
				this.setState({
					MainDomain: true,
				});
			}
			// console.log('error5 ' + this.state.MainDomain);
		}

		if (
			this.state.partnerRegisteredCompanyName === false &&
			this.state.PartnerBrandName === false &&
			this.state.CompanyRegistrationID === false &&
			this.state.CompanyTAXID === false &&
			this.state.SelectLanguage === false &&
			this.state.MainDomain === false
		) {
			return true;
		} else {
			return false;
		}
	}

	handleChangeStep3(e) {
		const target = e.target;
		const name = target.name;

		this.setState({
			[name]: target.value,
		});

		if (e.target.name === 'SalesHeadName') {
			if (this.validateName(e.target.value) === false) {
				this.setState({
					SalesHeadName: false,
				});
			}
			// console.log('error1 ' + this.state.SalesHeadName);
		} else if (e.target.name === 'SalesHeadEmailID') {
			if (this.validateEmail(e.target.value) === false) {
				this.setState({
					SalesHeadEmailID: false,
				});
			}
			// console.log('error2 ' + this.state.SalesHeadEmailID);
		} else if (e.target.name === 'AdminName') {
			if (this.validateName(e.target.value) === false) {
				this.setState({ emailError: true, AdminName: false });
			}
			// console.log('error3 ' + this.state.AdminName);
		} else if (e.target.name === 'AdminEmailID') {
			if (this.validateEmail(e.target.value) === false) {
				this.setState({
					AdminEmailID: false,
				});
			}
			// console.log('error3 ' + this.state.AdminEmailID);
		}

		if (
			this.state.SalesHeadName === false &&
			this.state.SalesHeadEmailID === false &&
			this.state.AdminName === false &&
			this.state.AdminEmailID === false
		) {
			return true;
		} else {
			return false;
		}
	}

	validateName(name) {
		const pattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
		const result = pattern.test(name);
		const { nameError } = this.state;
		if (result === true) {
			this.setState({
				nameError: false,
				name: name,
			});
		} else {
			this.setState({
				nameError: true,
			});
		}
		// console.log('nameerror ' + this.state.nameError);
		return nameError;
	}
	validateDomain(name) {
		const pattern = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/;
		const result = pattern.test(name);
		const { domainError } = this.state;
		if (result === true) {
			this.setState({
				domainError: false,
				name: name,
			});
		} else {
			this.setState({
				domainError: true,
			});
		}
		// console.log('error ' + this.state.nameError);
		return domainError;
	}

	validateEmail(email) {
		const pattern = /[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]/;
		const result = pattern.test(email);
		const { emailError } = this.state;
		if (result === true) {
			this.setState({
				emailError: false,
				email: email,
			});
		} else {
			this.setState({
				emailError: true,
			});
		}
		// console.log('emailerror ' + this.state.emailError);
		return emailError;
	}

	render() {
		const {
			isStep1,
			isStep2,
			isStep3_1,
			isStep3_2,
			isNext,
			isConfirm,
			isSubmit,
			isShowMerchantId,
			isCreateAccount,
			isShowTable,
			isConfirmDisabled,
			isNextDisabled,
			merchantIdAssigned,
		} = this.state;
		const { classes } = this.props;
		const step = this.state.isStep1
			? step1
			: this.state.isStep2
			? step2
			: this.state.isStep3_1
			? step3_1
			: step3_2;

		return (
			<div className={classes.root}>
				<Toolbar>
					{isStep1 || isStep2 ? (
						<Typography style={{ fontWeight: 900 }} variant='h4'>
							Add Merchant
						</Typography>
					) : (
						<Typography style={{ fontWeight: 900 }} variant='h4'>
							Add Country Level Managers
						</Typography>
					)}
				</Toolbar>

				<div>
					<Grid container direction='row'>
						<Grid item direction='column' className={classes.leftSide}>
							{step.map((item, index) => (
								<Grid container style={{ padding: 10 }}>
									<Typography className={classes.gridTypo}>
										{item.typo}
									</Typography>
									{isStep1 && (
										<TextField
											className={classes.textField}
											onChange={(event) => {
												item.data = event.target.value;
												this.handleChangeStep1(event);
												if (this.handleChangeStep1(event) === true) {
													this.setState({
														isConfirmDisabled: false,
													});
												} else if (this.handleChangeStep1(event) === false) {
													this.setState({
														isConfirmDisabled: true,
													});
												}
												// console.log(this.handleChangeStep1(event));
												console.log(isConfirmDisabled);
												postDataJsonStep1[item.id] = item.data;
											}}
											variant='outlined'
											placeholder={item.placeHold}
											name={item.id}
										/>
									)}
									{isStep2 && (
										<div>
											<AsynchronousMultiple item={item} />
											{item.id === 'CountryPresentIn' ? (
												<Typography className={classes.errorWarning}>
													Can select multiple countries
												</Typography>
											) : null}
											{item.id === 'StatesPresentIn' ? (
												<Typography className={classes.errorWarning}>
													Can select multiple states or select all (1st option)
												</Typography>
											) : null}
											{item.id === 'MainProduct' ? (
												<Typography className={classes.errorWarning}>
													Can type and select multiple products
												</Typography>
											) : null}
											{item.id === 'InsuranceProductInterestedtoSell' ? (
												<Typography className={classes.errorWarning}>
													Can select multiple products
												</Typography>
											) : null}
										</div>
									)}
									{isStep3_1 && (
										<div>
											<TextField
												disabled={index === 0 ? true : false}
												className={classes.textField}
												onChange={(event) => {
													item.data = event.target.value;
													this.handleChangeStep3(event);
													if (this.handleChangeStep3(event) === true) {
														this.setState({
															isNextDisabled: false,
														});
													} else if (this.handleChangeStep3(event) === false) {
														this.setState({
															isNextDisabled: true,
														});
													}
													// console.log(this.handleChangeStep1(event));
													console.log(isNextDisabled);

													postDataJsonStep3[item.id] = item.data;
												}}
												variant='outlined'
												placeholder={item.placeHold}
												InputProps={{
													endAdornment: (
														<InputAdornment>
															{index === 0 && (
																<IconButton>
																	<LocationOnIcon />
																</IconButton>
															)}
														</InputAdornment>
													),
												}}
												name={item.id}
											/>
											{item.id === 'selectCountry' ? (
												<Typography className={classes.errorWarning}>
													List of Countries selected in previous screen
												</Typography>
											) : null}
										</div>
									)}

									{isStep3_2 && (
										<div>
											<TextField
												disabled={index === 0 ? true : false}
												className={classes.textField}
												onChange={(event) => {
													item.data = event.target.value;
													postDataJsonStep3[item.id] = item.data;
												}}
												variant='outlined'
												placeholder={item.placeHold}
												InputProps={{
													endAdornment: (
														<InputAdornment>
															{index === 0 && (
																<IconButton>
																	<ArrowDownwardIcon />
																</IconButton>
															)}
														</InputAdornment>
													),
												}}
											/>
											<Popup
												trigger={
													<IconButton>
														<InfoIcon />
													</IconButton>
												}
												position='right center'
											>
												Upload Data in the SVG Format
											</Popup>
										</div>
									)}
								</Grid>
							))}

							{isStep2 && (
								<Grid container direction='row' style={{ marginLeft: 10 }}>
									<Typography className={classes.gridTypo}>
										Upload Registration Proof
									</Typography>

									<input
										accept='image/*'
										className={classes.input}
										id='contained-button-file'
										multiple
										type='file'
									/>
									<label htmlFor='contained-button-file'>
										<Button
											style={{
												marginTop: 10,
											}}
											variant='contained'
											color='primary'
											component='span'
											type='file'
											endIcon={<BackupIcon />}
										>
											UPLOAD FILE
										</Button>
									</label>
								</Grid>
							)}
							{isStep3_2 && (
								<Grid container direction='row' style={{ marginLeft: 10 }}>
									<Typography
										className={classes.gridTypo}
										style={{ paddingRight: 40 }}
									>
										Create Countrywise Managers
									</Typography>

									<input
										accept='image/*'
										className={classes.input}
										id='contained-button-file'
										multiple
										type='file'
									/>
									<label htmlFor='contained-button-file'>
										<Button
											style={{
												marginTop: 10,
											}}
											variant='contained'
											color='primary'
											component='span'
											type='file'
											endIcon={<BackupIcon />}
										>
											UPLOAD CSV
										</Button>
									</label>
								</Grid>
							)}
							{isConfirm && (
								<Button
									style={{
										marginLeft: 250,
										width: 240,
										marginTop: 10,
									}}
									variant='contained'
									color='primary'
									component='span'
									onClick={() => {
										this.setState({
											isNext: true,
											isConfirm: false,
											isShowMerchantId: true,
										});
									}}
									disabled={isConfirmDisabled}
								>
									CONFIRM
								</Button>
							)}
							{isNext && (
								<Button
									style={{
										marginLeft: 250,
										width: 240,
										marginTop: 10,
									}}
									variant='contained'
									color='primary'
									component='span'
									onClick={() => {
										this.setState({
											isShowMerchantId: false,
										});
										if (isStep1) {
											this.setState({
												isStep1: false,
												isStep2: true,
												isStep3_1: false,
												isStep3_2: false,
											});
											this.postData(postDataJsonStep1);
										} else if (isStep2) {
											this.setState({
												isStep1: false,
												isStep2: false,
												isStep3_1: true,
												isStep3_2: false,
											});
											postDataJsonStep2 = dataToSendToParent;

											this.postData(postDataJsonStep2);
										} else if (isStep3_1) {
											this.setState({
												isStep1: false,
												isStep2: false,
												isStep3_1: false,
												isStep3_2: true,
												isNext: false,
												isSubmit: true,
											});
											this.postData(postDataJsonStep3);
										}
									}}
									disabled={
										isStep1
											? false
											: isStep2
											? false
											: isStep3_1 && isNextDisabled
											? true
											: false
									}
								>
									NEXT
								</Button>
							)}
							{isSubmit && (
								<Button
									style={{
										marginLeft: 250,
										width: 240,
										marginTop: 10,
									}}
									variant='contained'
									color='primary'
									component='span'
									onClick={() => {
										if (isStep3_2) {
											this.postData(postDataJsonStep3);
											this.setState({
												isCreateAccount: true,
												isShowTable: true,
												isSubmitDisabled: true,
											});
										}
									}}
									disabled={this.state.isSubmitDisabled}
								>
									Submit
								</Button>
							)}
						</Grid>
						{isShowMerchantId && (
							<Grid
								justify='center'
								container
								direction='row'
								className={classes.rightSide}
							>
								<Grid
									container
									direction='row'
									style={{
										height: '30%',
										alignItems: 'center',
									}}
								>
									<Typography className={classes.gridTypo}>
										Merchant ID Assigned
									</Typography>
									<TextField
										className={classes.textField}
										value={merchantIdAssigned}
										disabled
										variant='outlined'
									/>
								</Grid>
							</Grid>
						)}
					</Grid>
					{isShowTable && (
						<div style={{ marginRight: 32, marginTop: 32, marginLeft: 20 }}>
							<Table />
						</div>
					)}
					{isCreateAccount && (
						<Button
							style={{
								marginTop: 50,
								marginLeft: '80%',
								// marginRight:"20%",
								width: 256,
								height: 60,
							}}
							variant='contained'
							color='primary'
							component='span'
							// position="relative"
							// onClick={() => {

							// }}
						>
							Create Account
						</Button>
					)}
				</div>
			</div>
		);
	}
}
export default withStyles(styles)(CreateMerchant);
