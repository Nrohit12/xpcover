import React, { Component, useState, useEffect } from 'react';

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
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import dummyImg from '../../../shared/assets/png/dummyimage1.png';
import LinearBuffer from '../../../shared/components/LinerBuffer';
import profile_pic from './../../dummy_data/images/image2.jpg';
import Table from '../dashboard/Table';
import AddProductNameDetails from './AddProductNameDetails.js';
import NamesContainer from './NamesContainer';
import {
	AsynchronousSingle,
	AutoCompleteTextField,
	testData,
} from '../../../shared/components/AutoCompleteTextField';
import axios from 'axios';

const data = {
	product_name: null,
	insurance_type: null,
	insurance_category: null,
	tags: null,
};

const styles = (theme) => ({
	root: {
		flexGrow: 1,
	},

	divider: {
		width: 400,
		height: 2,
	},
	subHead: {
		fontWeight: 500,
		marginBottom: 10,
	},
	editProfileTextFieldSection: {
		width: 200,
	},
	editProfileTypographySection: {
		width: 200,

		alignSelf: 'center',
	},
	editProfileTypography: {
		marginBottom: 20,
		width: 240,

		alignSelf: 'center',
	},

	editProfileTextField: {
		marginBottom: 20,
		width: 250,
		backgroundColor: 'white',
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
		width: 600,

		// marginBottom: 20,
	},
});

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isNext: false,
			isNextPage: false,

			todos: null,
			productName: null,

			productIdAssigned: null,
		};
	}
	editSearchTerm = (e) => {
		this.setState({ searchTerm: e.target.value });
	};
	dynamicSearch = () => {
		return this.state.names.filter((name) =>
			name.toLowerCase().includes(this.state.searchTerm.toLowerCase()),
		);
	};

	// try {
	// 	let result = await fetch(
	// 		"http://11bfeba494dc.ngrok.io/addProduct"
	// 	)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			this.setState({
	// 				productIdAssigned: data.productIdAssigned,
	// 			});
	// 		})
	// 		.catch(console.log);
	// } catch (e) {
	// 	console.log(e);
	// }

	async postData() {
		// try {
		// 	let result = await fetch(
		// 		"https://webhook.site/f38a3110-07c3-4e98-8b17-879e3c6afa6a",
		// 		{
		// 			method: "post",
		// 			mode: "no-cors",
		// 			headers: {
		// 				Accept: "application/json",
		// 				"Content-type": "application/json",
		// 			},
		// 			body: JSON.stringify(data),
		// 		}
		// 	);
		// 	console.log("Result" + result);
		// } catch (e) {
		// 	console.log(e);

		await axios
			.post(
				'https://webhook.site/b35bb57d-2052-4522-b1b0-bb2f179cbed4',
				data,
			)
			.then((response) => {
				this.setState({
					productIdAssigned: response.data.productIdAssigned,
				});
				console.log(response);
			})
			.catch((err, response) => {
				// console.error(err + "error" + response);
			});
	}

	render() {
		const { classes } = this.props;
		const { isNext, isNextPage, productName } = this.state;

		return (
			<div className={classes.root}>
				{!isNextPage && (
					<div style={{ marginLeft: 50 }}>
						<Typography
							variant='h5'
							className={classes.subHead}
						>
							PRODUCTS
						</Typography>
						<Divider className={classes.divider} />
						<Typography
							className={classes.subHead}
							variant='h4'
						>
							Add Insurance Product
						</Typography>
						<Grid
							container
							direction='row'
							style={{ marginTop: 37 }}
						>
							<Grid
								item
								direction='column'
								className={classes.editProfile}
							>
								<Grid
									container
									direction='row'
									// style={{ padding: 10 }}
								>
									<Typography
										className={
											classes.editProfileTypography
										}
									>
										Product Name
									</Typography>

									<TextField
										onChange={(event) => {
											data.product_name =
												event.target.value;
											this.setState({
												productName:
													event.target
														.value,
											});
										}}
										className={
											classes.editProfileTextField
										}
										variant='outlined'
										placeholder='Product Name'
									/>

									{/* <AsynchronousSingle
											itemId="product_name"
											label="Registered Name"
										/> */}

									{/* <NamesContainer
										names={this.dynamicSearch()}
									/>
								 */}
									<Typography
										className={
											classes.editProfileTypography
										}
									>
										Product Type
									</Typography>
									<div
										className={
											classes.editProfileTextField
										}
									>
										<AsynchronousSingle
											itemId='insurance_type'
											label='Brand Name'
										/>
									</div>
									{/* <TextField
										onChange={(event) => {
											data.insurance_type =
												event.target.value;
										}}
										className={
											classes.editProfileTextField
										}
										variant="outlined"
										placeholder="Brand Name"
									/> */}
									<Typography
										className={
											classes.editProfileTypography
										}
									>
										Product Category
									</Typography>
									{/* <TextField
										onChange={(event) => {
											data.insurance_category =
												event.target.value;
										}}
										className={
											classes.editProfileTextField
										}
										variant="outlined"
										placeholder="Registration ID"
									/> */}
									<div
										className={
											classes.editProfileTextField
										}
									>
										<AsynchronousSingle
											itemId='insurance_category'
											label='Registration ID'
										/>
									</div>
									<Typography
										className={
											classes.editProfileTypography
										}
									>
										Product Tag
									</Typography>

									<TextField
										onChange={(event) => {
											data.tags =
												event.target.value;
										}}
										className={
											classes.editProfileTextField
										}
										variant='outlined'
										placeholder='Tags'
									/>
									{/* <TextField
										onChange={(event) => {
											data.tags =
												event.target.value;
										}}
										className={
											classes.editProfileTextField
										}
										variant="outlined"
										placeholder="Registration ID"
									/> */}
									{!isNext && (
										<Button
											style={{
												marginTop: 173,
												marginBottom: 50,
												marginLeft: 240,
												width: 184,
												height: 60,
											}}
											onClick={() => {
												this.setState({
													isNext: true,
												});
												this.postData();
												// this.getData();
											}}
											variant='contained'
											color='primary'
										>
											CONFIRM
										</Button>
									)}
									{isNext && (
										<Button
											style={{
												marginTop: 173,
												marginBottom: 50,
												marginLeft: 240,
												width: 184,
												height: 60,
											}}
											onClick={() =>
												this.setState({
													isNextPage: true,
												})
											}
											variant='contained'
											color='primary'
										>
											NEXT
										</Button>
									)}
								</Grid>
							</Grid>

							{isNext && (
								<Grid
									item
									direction='column'
									className={classes.editProfile}
								>
									<Grid
										container
										direction='row'
										// style={{ padding: 10 }}
									>
										<Typography
											className={
												classes.editProfileTypography
											}
										>
											Product ID Assigned
										</Typography>

										<TextField
											value={
												this.state
													.productIdAssigned
											}
											disabled
											variant='outlined'
											placeholder='Amazon'
											className={
												classes.editProfileTextField
											}
										/>
									</Grid>
								</Grid>
							)}
						</Grid>
					</div>
				)}
				{isNextPage && (
					<AddProductNameDetails
						productIdAssigned={this.state.productIdAssigned}
						productName={this.state.productName}
					/>
				)}
			</div>
		);
	}
}

export default withStyles(styles)(Profile);
