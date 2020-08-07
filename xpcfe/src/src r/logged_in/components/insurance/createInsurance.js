import React, { Component, useState } from 'react';
import {
	Grid,
	Typography,
	Paper,
	Toolbar,
	withStyles,
	makeStyles,
	TextField,
	IconButton,
	Button,
	Box,
	StepLabel,
	Step,
	Stepper,
	StepConnector,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';

import clsx from 'clsx';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
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
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import BackupIcon from '@material-ui/icons/Backup';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';

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
		width: 600,
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
		backgroundColor: 'white',
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

// for stepper

const ColorlibConnector = withStyles({
	alternativeLabel: {
		top: 22,
	},
	active: {
		'& $line': {
			backgroundImage:
				'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
		},
	},
	completed: {
		'& $line': {
			backgroundImage:
				'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
		},
	},
	line: {
		height: 3,
		border: 0,
		backgroundColor: '#eaeaf0',
		borderRadius: 1,
	},
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
	root: {
		backgroundColor: '#ccc',
		zIndex: 1,
		color: '#fff',
		width: 50,
		height: 50,
		display: 'flex',
		borderRadius: '50%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	active: {
		backgroundImage:
			'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
	},
	completed: {
		backgroundImage:
			'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
	},
});

function ColorlibStepIcon(props) {
	const classes = useColorlibStepIconStyles();
	const { active, completed } = props;

	const icons = {
		1: <SettingsIcon />,
		2: <GroupAddIcon />,
		3: <VideoLabelIcon />,
	};

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active,
				[classes.completed]: completed,
			})}
		>
			{icons[String(props.icon)]}
		</div>
	);
}

function getSteps() {
	return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
	switch (step) {
		case 0:
			return 'Select campaign settings...';
		case 1:
			return 'What is an ad group anyways?';
		case 2:
			return 'This is the bit I really care about!';
		default:
			return 'Unknown step';
	}
}

let postDataJsonStep1 = {};
let postDataJsonStep2 = {};
let postDataJsonStep3 = {};
const step1 = [
	{
		id: 'partnerRegisteredCompanyName',
		typo: 'Partner Registered Company Name',
		placeHold: 'Registered Name',
		data: null,
		errorMessage: 'Invalid Company Name',
		hasError: true,
	},
	{
		id: 'PartnerBrandName',
		typo: 'Partner Brand Name',
		placeHold: 'Brand Name',
		data: null,
		errorMessage: 'Invalid Partner Brand Name',
		hasError: true,
	},
	{
		id: 'CompanyRegistrationID',
		typo: 'Company Registration ID',
		placeHold: 'Registration ID ',
		data: null,
		errorMessage: 'Invalid Company Registration ID',
		hasError: true,
	},
	{
		id: 'CompanyTAXID',
		typo: 'Company TAX ID',
		placeHold: 'GST/VAT ID',
		data: null,
		errorMessage: 'Invalid Company TAX ID',
		hasError: true,
	},

	{
		id: 'MainDomain',
		typo: 'Main Domain',
		placeHold: 'www.abc.com',
		data: null,
		errorMessage: 'Invalid MainDomain',
		hasError: true,
	},
];
const step2 = [
	{
		id: 'CountryPresentIn',
		typo: 'Country Present In',
		placeHold: 'Country',
		data: null,
		errorMessage: 'Invalid Country Present In',
		hasError: true,
	},
	{
		id: 'StatesPresentIn',
		typo: 'States Present In',
		placeHold: 'All State',
		data: null,
		errorMessage: 'Invalid States Present In',
		hasError: true,
	},
	{
		id: 'MainProduct',
		typo: 'Main Product',
		placeHold: 'Add Product Type',
		data: null,
		errorMessage: 'Invalid Main Product',
		hasError: true,
	},
	{
		id: 'InsuranceProductInterestedToSell',
		typo: 'Insurance Product Interested to Sell',
		placeHold: 'Product name',
		data: null,
		errorMessage: 'Invalid Main Product',
		hasError: true,
	},
];
const step3 = [
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

let compiledData = {};

class CreateInsurance extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isStep1: true,
			isStep2: false,
			isStep3: false,
			isStep4: false,
			isNext: false,
			isConfirm: true,
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
			insuranceIdAssigned: 'Amazon',
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
					this.setState({ merchantIdAssigned: data });
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

	//input validator step 1
	handleChangeStep1(e) {
		const target = e.target;
		const name = target.name;
		// console.log(e.target.name);
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
			this.state.MainDomain === false
		) {
			return true;
		} else {
			return false;
		}

		// console.log(this.state.isConfirmDisabled);
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
	}

	render() {
		const {
			isStep1,
			isStep2,
			isStep3,
			isNext,
			isConfirm,
			isShowMerchantId,
			isConfirmDisabled,
			isNextDisabled,
			insuranceIdAssigned,
		} = this.state;
		const { classes } = this.props;
		const step = this.state.isStep1
			? step1
			: this.state.isStep2
			? step2
			: step3;
		// const nextDisabled = () => ({
		// 	if(isStep1===true){
		// 		return false;
		// 	}else if(is)
		// )}

		return (
			<div className={classes.root}>
				<Toolbar>
					<Typography style={{ fontWeight: 900 }} variant='h4'>
						Add insurance company
					</Typography>
				</Toolbar>

				<div>
					<Grid container direction='row'>
						<Grid item direction='column' className={classes.leftSide}>
							{step.map((item, index) => (
								<Grid container direction='row' style={{ padding: 10 }}>
									<Typography className={classes.gridTypo}>
										{item.typo}
									</Typography>
									{isStep1 && (
										<TextField
											required={true}
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
										</div>
									)}
									{isStep3 && (
										<div>
											<TextField
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
												name={item.id}
											/>
											{item.id === 'selectCountry' ? (
												<Typography className={classes.errorWarning}>
													List of Countries selected in previous screen
												</Typography>
											) : null}
										</div>
									)}
								</Grid>
							))}

							{(isStep2 || isStep3) && (
								<Grid container direction='row' style={{ marginLeft: 10 }}>
									<Typography className={classes.gridTypo}>
										{isStep2
											? 'Upload Registration Proof '
											: 'Admin Phone Number'}
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
												isStep3: false,
											});
											this.postData(postDataJsonStep1);
										} else if (isStep2) {
											this.setState({
												isStep1: false,
												isStep2: false,
												isStep3: true,
											});
											postDataJsonStep2 = dataToSendToParent;

											this.postData(postDataJsonStep2);
										} else if (isStep3) {
											this.postData(postDataJsonStep3);
										}
									}}
									disabled={
										isStep1
											? false
											: isStep2
											? false
											: isStep3 && isNextDisabled
											? true
											: false
									}
								>
									NEXT
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
										Insurance ID Assigned
									</Typography>
									<TextField
										className={classes.textField}
										value={insuranceIdAssigned}
										disabled
										variant='outlined'
									/>
								</Grid>
							</Grid>
						)}
					</Grid>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(CreateInsurance);
