import React, { Component, Fragment } from 'react';

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
	Divider,
	FormControl,
	MenuItem,
	Select,
	InputLabel,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import dummyImg from '../../../shared/assets/png/dummyimage1.png';
import LinearBuffer from '../../../shared/components/LinerBuffer';
import profile_pic from './../../dummy_data/images/image2.jpg';
import Table from '../dashboard/Table';
import AddProduct from './AddProduct';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		// width: 1000,
		// backgroundColor: "red",
	},

	divider: {
		width: 400,
		height: 2,
	},
	subHead: {
		fontWeight: 900,
		marginBottom: 10,
		fontSize: 14,
	},
	head: {
		fontSize: 24,
		fontWeight: 900,
	},
	editProfileTextFieldSection: {
		width: 200,
	},
	editProfileTypographySection: {
		width: 200,

		alignSelf: 'center',
	},
	gFName: {
		marginBottom: 20,
		marginRight: 170,
		marginLeft: 50,
		fontWeight: 900,

		alignSelf: 'center',
	},
	selectField: {
		marginBottom: 20,
		marginRight: 80,
		marginTop: 10,

		alignSelf: 'center',
	},
	fieldHeader1: { marginRight: 100, marginBottom: 16, fontWeight: 900 },
	fieldHeader2: { marginRight: 265, marginBottom: 16, fontWeight: 900 },
	fieldHeader3: { marginRight: 197, marginBottom: 16, fontWeight: 900 },
	fieldHeader4: { fontWeight: 900 },

	fieldTextFields: {
		marginBottom: 16,
		width: 250,
		backgroundColor: 'white',
		marginRight: 90,
	},
	profilePic: {
		borderRadius: 200,
		width: 200,
		height: 200,
		marginLeft: '25%',
	},

	gridTypo: {
		width: 240,

		alignSelf: 'center',
		marginBottom: 20,
	},
	editProfile: {
		width: 'auto',

		// marginBottom: 20,
	},
	formControl: {
		minWidth: 190,
		backgroundColor: 'white',
		marginLeft: 0,
	},
	button: {
		width: 209,
		height: 52,
		overflow: 'visible',
		backgroundColor: '#25274D',
		position: 'absolute',
		right: 620,
		color: '#A5ADBB',
		fontWeight: 900,
		marginTop: 50,
		marginBottom: 50,
	},
});
var i = 0;
let StringObj = {};
let DecimalObj = {};
let BooleanObj = {};
let DateObj = {};
let ArrayObj = {};
let data = {};

class AddProductTravelInsurance extends Component {
	constructor(props) {
		super(props);
		this.state = { selectedFieldType: 40 };
	}

	fieldTypeRender(length) {
		let fieldTypeDataJSON = {};
		if (length === 120) {
			alert('use multiple strings with comma (,) between them');
		}

		const { classes } = this.props;
		for (
			length === 40
				? (i = 1)
				: length === 73
				? (i = 41)
				: length === 85
				? (i = 74)
				: length === 105
				? (i = 86)
				: (i = 106);
			i <= length;
			i++
		) {
			fieldTypeDataJSON[`x` + i] = '';
		}
		return (
			<div>
				{Object.keys(fieldTypeDataJSON).map((item, i) => (
					<Grid container direction='row' style={{ padding: 10 }}>
						<Typography className={classes.gFName}>{item}</Typography>

						<TextField
							disabled
							variant='outlined'
							placeholder={
								length === 40
									? 'String'
									: length === 73
									? 'Decimal'
									: length === 85
									? 'Boolean'
									: length === 105
									? 'Date'
									: 'Array'
							}
							className={classes.fieldTextFields}
						/>

						{length === 40 && (
							<TextField
								type='text'
								onChange={(event) => {
									let reg = /,/g;
									if (event.target.value.match(reg)) {
										alert('Enter single String only!!!');
									}
									fieldTypeDataJSON[item] = event.target.value;
									StringObj = fieldTypeDataJSON;
								}}
								variant='outlined'
								placeholder='Brand Name'
								className={classes.fieldTextFields}
							/>
						)}

						{length === 73 && (
							<TextField
								type='number'
								onChange={(event) => {
									fieldTypeDataJSON[item] = event.target.value;
									DecimalObj = fieldTypeDataJSON;
								}}
								variant='outlined'
								placeholder='Brand Name'
								className={classes.fieldTextFields}
							/>
						)}
						{length === 85 && (
							<TextField
								type='text'
								onChange={(event) => {
									fieldTypeDataJSON[item] = event.target.value;
									BooleanObj = fieldTypeDataJSON;
								}}
								variant='outlined'
								placeholder='Brand Name'
								className={classes.fieldTextFields}
							/>
						)}
						{length === 105 && (
							<TextField
								type='date'
								onChange={(event) => {
									fieldTypeDataJSON[item] = event.target.value;
									DateObj = fieldTypeDataJSON;
								}}
								variant='outlined'
								placeholder='Brand Name'
								className={classes.fieldTextFields}
							/>
						)}
						{length === 120 && (
							<TextField
								type='text'
								onChange={(event) => {
									fieldTypeDataJSON[item] = event.target.value;
									ArrayObj = fieldTypeDataJSON;
								}}
								variant='outlined'
								placeholder='Brand Name '
								className={classes.fieldTextFields}
							/>
						)}

						{/* <TextField
							value={null}
							type={
								length === 40
									? "text"
									: length === 73
									? "number"
									: length === 85
									? "Boolean"
									: length === 105
									? "date"
									: "array"
							}
							onChange={(event) => {
								let reg = /,/g;
								if (
									event.target.value.match(reg) &&
									length === 40
								) {
									alert(`Use single String only!!!`);
								}
								decimalObj[item] = event.target.value;
							}}
							variant="outlined"
							placeholder="Brand Name"
							className={classes.fieldTextFields}
						/> */}
						<TextField
							disabled
							variant='outlined'
							placeholder='Brand Name'
							className={classes.fieldTextFields}
						/>
					</Grid>
				))}
			</div>
		);
	}

	async postData() {
		data = {
			...StringObj,
			...DecimalObj,
			...BooleanObj,
			...DateObj,
			...ArrayObj,
		};
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

	render() {
		const { classes } = this.props;
		const { selectedFieldType } = this.state;

		return (
			<div className={classes.root}>
				<div style={{ marginLeft: 50 }}>
					<Typography variant='h5' className={classes.subHead}>
						PRODUCTS
					</Typography>
					<Divider className={classes.divider} />
					<Grid container direction='row'>
						<Typography className={classes.head} variant='h4'>
							Add Insurance Product - Travel Insurance
						</Typography>

						<Typography
							style={{
								marginLeft: 60,
							}}
							className={classes.subHead}
							variant='h4'
						>
							{this.props.productName}
						</Typography>
					</Grid>
					<Grid container direction='row' style={{ marginTop: 41 }}>
						<Typography className={classes.selectField}>
							Select Data Field Type
						</Typography>

						<FormControl variant='outlined' className={classes.formControl}>
							<InputLabel id='demo-simple-select-label'></InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={this.state.selectedFieldType}
								onChange={(event) => {
									this.setState({
										selectedFieldType: event.target.value,
									});
								}}
							>
								<MenuItem value={40}>String</MenuItem>
								<MenuItem value={73}>Decimal</MenuItem>
								<MenuItem value={85}>Boolean</MenuItem>
								<MenuItem value={105}>Date</MenuItem>
								<MenuItem value={120}>Array</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid container direction='row' style={{ marginTop: 37 }}>
						<Grid item direction='column' className={classes.editProfile}>
							<Grid
								container
								direction='row'
								// style={{ padding: 10 }}
							>
								<Typography className={classes.fieldHeader1}>
									Generic Field Name
								</Typography>

								<Typography className={classes.fieldHeader2}>
									Field Type
								</Typography>

								<Typography className={classes.fieldHeader3}>
									Product Field Name
								</Typography>
								<Typography className={classes.fieldHeader4}>
									Field Validation
								</Typography>
							</Grid>
							{/* {this.state.selectedFieldType === 40 &&
								this.stringObject(40)}
							{this.state.selectedFieldType === 73 &&
								this.decimalObject(73)} */}
							{this.fieldTypeRender(selectedFieldType)}

							{/* {Object.keys(obj).map((item, i) => (
								<Grid
									container
									direction="row"
									style={{ padding: 10 }}
								>
									<Typography
										className={classes.gFName}
									>
										{item}
									</Typography>

									<TextField
										disabled
										// onChange={(event) => {
										// 	obj[item] = {
										// 		fType:
										// 			event.target
										// 				.value,
										// 	};
										// }}
										variant="outlined"
										placeholder="String"
										className={
											classes.fieldTextFields
										}
									/>
									<TextField
										onChange={(event) => {
											obj[item] = {
												fName:
													event.target
														.value,
											};
										}}
										variant="outlined"
										placeholder="Brand Name"
										className={
											classes.fieldTextFields
										}
									/>
									<TextField
										disabled
										// onChange={(event) => {
										// 	obj[item] = {
										// 		fName:
										// 			obj[item]
										// 				.fname,

										// 		x:
										// 			event.target
										// 				.value,
										// 	};
										// }}
										variant="outlined"
										placeholder="Brand Name"
										className={
											classes.fieldTextFields
										}
									/>
								</Grid>
							))} */}

							<Button
								onClick={() => this.postData()}
								variant='contained'
								className={classes.button}
								// href="/c/addProduct"
							>
								SAVE
							</Button>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(AddProductTravelInsurance);
