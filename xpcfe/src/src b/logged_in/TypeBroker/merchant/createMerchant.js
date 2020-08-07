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
	AutoCompleteTextField,
	AsynchronousMultiple,
	dataToSendToParent,
} from './AutoCompleteTextField';

import { dummydata } from './dummydata.js';
import axios from 'axios';
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
});
let wholeStepData = {};
let postDataJsonStep1 = {};
let postDataJsonStep2 = {};
let postDataJsonStep3 = {};
const step1 = [
	{
		id: 'company_name',
		typo: 'Partner Registered Company Name',
		placeHold: 'Registered Name',
		data: null,
	},
	{
		id: 'brand_name',
		typo: 'Partner Brand Name',
		placeHold: 'Brand Name',
		data: null,
	},
	{
		id: 'registration_id',
		typo: 'Company Registration ID',
		placeHold: 'Registration ID ',
		data: null,
	},
	{
		id: 'vat',
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
		id: 'country_present_in',
		typo: 'Country Present In',
		placeHold: 'Country',
		data: null,
	},
	{
		id: 'state_present_in',
		typo: 'States Present In',
		placeHold: 'All State',
		data: null,
	},
	{
		id: 'main_product',
		typo: 'Main Product',
		placeHold: 'Add Product Type',
		data: null,
	},
	{
		id: 'insurance_product_name',
		typo: 'Insurance Product Interested to Sell',
		placeHold: 'Product name',
		data: null,
	},
];
const step3 = [
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
		id: 'SalesheadEmailID',
		typo: 'Sales head Email ID',
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

class CreateMerchant extends Component {
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
			merchantIdAssigned: 'Amazon',
			filex: null,
		};
	}

	async getData() {
		fetch('http://jsonplaceholder.typicode.com/todos');

		try {
			let result = await fetch(
				'http://jsonplaceholder.typicode.com/todos',
			)
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

	async postWholeData(whole) {
		let data = new FormData();

		data.append('file', this.state.filex);
		data.append('document', JSON.stringify(whole));

		await axios
			.post('http://f2635d186ab8.ngrok.io/addPartner', data)

			.catch((err, response) => {
				// console.error(err + "error" + response);
			});
	}
	async postData(data) {
		await axios
			.post('http://f2635d186ab8.ngrok.io/addPartner', data)
			.then((response) => {
				this.setState({
					insuranceIdAssigned:
						response.data.insuranceCompanyIdAssigned,
				});
				console.log(response);
			})
			.catch((err, response) => {
				console.error(err + 'error' + response);
			});
	}
	// submitRegProof() {
	// 	let file = this.state.filex;
	// 	let formdata = new FormData();
	// 	formdata.append('file', file);
	// 	this.setState({
	// 		reg_proof: formdata,
	// 	});
	// }

	render() {
		const {
			isStep1,
			isStep2,
			isStep3,
			isNext,
			isConfirm,
			isShowMerchantId,
			merchantIdAssigned,
		} = this.state;
		const { classes } = this.props;
		const step = this.state.isStep1
			? step1
			: this.state.isStep2
			? step2
			: step3;

		return (
			<div className={classes.root}>
				<Toolbar>
					<Typography style={{ fontWeight: 900 }} variant='h4'>
						Add Merchant
					</Typography>
				</Toolbar>

				<div>
					<Grid container direction='row'>
						<Grid
							item
							direction='column'
							className={classes.leftSide}
						>
							{step.map((item, index) => (
								<Grid
									container
									direction='row'
									style={{ padding: 10 }}
								>
									<Typography
										className={classes.gridTypo}
									>
										{item.typo}
									</Typography>
									{isStep1 && (
										<TextField
											className={
												classes.textField
											}
											onChange={(event) => {
												item.data =
													event.target.value;
												postDataJsonStep1[
													item.id
												] = item.data;
											}}
											variant='outlined'
											placeholder={
												item.placeHold
											}
										/>
									)}
									{isStep2 && (
										<div>
											{/* <AutoCompleteTextField
												item={item}
											/> */}
											<AsynchronousMultiple
												item={item}
											/>
										</div>
									)}
									{isStep3 && (
										<TextField
											disabled={
												index === 0
													? true
													: false
											}
											className={
												classes.textField
											}
											onChange={(event) => {
												item.data =
													event.target.value;
												postDataJsonStep3[
													item.id
												] = item.data;
											}}
											variant='outlined'
											placeholder={
												item.placeHold
											}
											InputProps={{
												endAdornment: (
													<InputAdornment>
														{index ===
															0 && (
															<IconButton>
																<SearchIcon />
															</IconButton>
														)}
													</InputAdornment>
												),
											}}
										/>
									)}
								</Grid>
							))}

							{isStep2 && (
								<Grid
									container
									direction='row'
									style={{ marginLeft: 10 }}
								>
									<Typography
										className={classes.gridTypo}
									>
										Upload Registration Proof
									</Typography>
									<input
										accept='image/*'
										className={classes.input}
										id='contained-button-file'
										multiple
										type='file'
										onChange={(e) => {
											this.setState({
												filex:
													e.target
														.files[0],
											});
										}}
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
										this.postData({
											confirm: true,
										});
									}}
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
											// this.postData(
											// 	postDataJsonStep1
											// );
										} else if (isStep2) {
											this.setState({
												isStep1: false,
												isStep2: false,
												isStep3: true,
											});
											postDataJsonStep2 = dataToSendToParent;
											// this.submitRegProof();

											// this.postData(
											// 	postDataJsonStep2
											// );
										} else if (isStep3) {
											wholeStepData = {
												...postDataJsonStep1,
												...postDataJsonStep2,
												...postDataJsonStep3,

												...{
													confirm: false,
												},
											};
											this.postWholeData(
												wholeStepData,
											);
										}
									}}
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
									<Typography
										className={classes.gridTypo}
									>
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
				</div>
			</div>
		);
	}
}
export default withStyles(styles)(CreateMerchant);
