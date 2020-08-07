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
} from './AutoCompleteTextField';
import axios from 'axios';
import ButtonCircularProgress from '../../../shared/components/ButtonCircularProgress';
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
//to ask Partner Brand Name (backend not present)
// step 3 all details are not same in backend + front end
const step1 = [
	{
		value: 1,
		id: 'registered_company_name',
		typo: 'Registered Company Name',
		placeHold: 'Registered Name',
		data: '',
	},
	{
		value: 2,
		id: 'partner_brand_name',
		typo: 'Partner Brand Name',
		placeHold: 'Brand Name',
		data: '',
	},
	{
		value: 3,
		id: 'company_registration_id',
		typo: 'Company Registration ID',
		placeHold: 'Registration ID ',
		data: '',
	},
	{
		value: 4,
		id: 'company_vat',
		typo: 'Company TAX ID',
		placeHold: 'GST/VAT ID',
		data: '',
	},

	{
		value: 5,
		id: 'website_url',
		typo: 'Main Domain',
		placeHold: 'www.abc.com',
		data: '',
		type: 'url',
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
		id: 'select_insurance_product',
		typo: 'Insurance Product Interested to Sell',
		placeHold: 'Product name',
		data: null,
	},
];
const step3 = [
	{
		id: 'head_sales_name',
		typo: 'Sales Head Name',
		placeHold: 'Full Name',
		data: null,
	},

	{
		id: 'head_sales_email',
		typo: 'Sales Head Email ID',
		placeHold: 'Email ID',
		data: null,
		type: 'email',
	},
	{
		id: 'admin_name',
		typo: 'Admin Name',
		placeHold: 'Full Name',
		data: null,
	},
	{
		id: 'admin_email',
		typo: 'Admin Email ID',
		placeHold: 'Email ID',
		data: null,
		type: 'email',
	},
	{
		id: 'admin_phone',
		typo: 'Admin Phone Number',
		placeHold: 'Phone Number',
		data: null,
	},
];

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
			isShowInsuranceId: false,
			insuranceCompanyIdAssigned: null,
			isLoading: false,

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
					this.setState({
						insuranceCompanyIdAssigned:
							data.insuranceCompanyIdAssigned,
						isNext: true,
					});
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
			.post('http://9eabe9bdf4c0.ngrok.io/addCompany', data)

			.catch((err, response) => {
				// console.error(err + "error" + response);
			});
	}
	async postData(data) {
		await axios
			.post('http://9eabe9bdf4c0.ngrok.io/addCompany', data)
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
	submitRegProof() {
		let file = this.state.filex;
		let formdata = new FormData();
		formdata.append('file', file);
		this.setState({
			reg_proof: formdata,
		});
	}

	render() {
		const {
			isStep1,
			isStep2,
			isStep3,
			isNext,
			isConfirm,
			isShowInsuranceId,
			insuranceCompanyIdAssigned,
			isLoading,
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
						Add insurance company
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
											required
											type={
												item.type
													? item.type
													: 'text'
											}
											className={
												classes.textField
											}
											onChange={(event) => {
												postDataJsonStep1[
													item.id
												] =
													event.target.value;
											}}
											variant='outlined'
											placeholder={
												item.placeHold
											}
										/>
									)}

									{isStep2 && (
										<div>
											<AsynchronousMultiple
												item={item}
											/>
										</div>
									)}
									{isStep3 && (
										<TextField
											required
											type={
												item.type
													? item.type
													: 'text'
											}
											className={
												classes.textField
											}
											onChange={(event) => {
												postDataJsonStep3[
													item.id
												] =
													event.target.value;
											}}
											variant='outlined'
											placeholder={
												item.placeHold
											}
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
											isShowInsuranceId: true,
											isLoading: true,
										});
										this.postData({
											confirm: true,
										});
									}}
								>
									{isLoading && (
										<ButtonCircularProgress />
									)}
									CONFIRM
								</Button>
							)}

							{/* show next when insurance id is assigned from this.state (Response ) */}
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
											isShowInsuranceId: false,
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
											// this.submitRegProof();
											postDataJsonStep2 = dataToSendToParent;
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
						{isShowInsuranceId && (
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
										Insurance ID Assigned
									</Typography>
									<TextField
										className={classes.textField}
										value={
											insuranceCompanyIdAssigned
										}
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
