import React, { Component } from "react";
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
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import dummyImg from "./../../shared/assets/png/dummyimage1.png";
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
	},
	rightSide: {
		width: "auto",
	},
	gridTypo: {
		width: 240,

		alignSelf: "center",
	},
	image: {
		width: 300,
		height: 200,
	},
	input: {
		display: "none",
	},
});

const step1 = [
	{ typo: "Partner Registered Company Name", placeHold: "Registered Name" },
	{ typo: "Partner Brand Name", placeHold: "Brand Name" },
	{
		typo: "Company Registration ID",
		placeHold: "Registration ID ",
	},
	{ typo: "Company TAX ID", placeHold: "GST?VAT ID" },
	{ typo: "Select Language", placeHold: "Hindi" },
	{ typo: "Main Domain", placeHold: "www.abc.com" },
];
const step2 = [
	{ typo: "Country Present In", placeHold: "Country" },
	{ typo: "States Present In", placeHold: "All Staste" },
	{
		typo: "Main Product",
		placeHold: "Add Product Type",
	},
	{
		typo: "Insurance Product Interested to Sell",
		placeHold: "Product name",
	},
];
const step3 = [
	{ typo: "Sales Head Name", placeHold: "Full Name" },

	{
		typo: "Sales head Email ID",
		placeHold: "Email ID",
	},
	{
		typo: "Admin Name",
		placeHold: "Full Name",
	},
	{
		typo: "Admin Email ID",
		placeHold: "Email ID",
	},
];

class CreateMerchant extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isStep1: true,
			isStep2: false,
			isStep3: false,
		};
	}
	render() {
		const { isStep1, isStep2, isStep3 } = this.state;
		const { classes } = this.props;
		const step = this.state.isStep1
			? step1
			: this.state.isStep2
			? step2
			: step3;

		return (
			<div className={classes.root}>
				<Toolbar>
					<Typography variant="h4">Add Merchant</Typography>
				</Toolbar>

				<div>
					<Grid container direction="row">
						<Grid
							item
							direction="column"
							className={classes.leftSide}
						>
							{step.map((item) => (
								<Grid
									container
									direction="row"
									style={{ padding: 10 }}
								>
									<Typography
										className={classes.gridTypo}
									>
										{item.typo}
									</Typography>

									<TextField
										variant="outlined"
										placeholder={item.placeHold}
										InputProps={{
											endAdornment: (
												<InputAdornment>
													{this.state
														.isStep2 && (
														<IconButton>
															<SearchIcon />
														</IconButton>
													)}
												</InputAdornment>
											),
										}}
									/>
								</Grid>
							))}

							{(isStep2 || isStep3) && (
								<Grid
									container
									direction="row"
									style={{ marginLeft: 10 }}
								>
									<Typography
										className={classes.gridTypo}
									>
										{isStep2
											? "Upload Registration Proof"
											: "Admin Phone Number"}
									</Typography>

									<input
										accept="image/*"
										className={classes.input}
										id="contained-button-file"
										multiple
										type="file"
									/>
									<label htmlFor="contained-button-file">
										<Button
											style={{
												marginTop: 10,
											}}
											variant="contained"
											color="primary"
											component="span"
											type="file"
										>
											UPLOAD FILE
										</Button>
									</label>
								</Grid>
							)}

							<Button
								style={{
									marginLeft: 250,
									width: 240,
									marginTop: 10,
								}}
								variant="contained"
								color="primary"
								component="span"
								onClick={() => {
									this.state.isStep1
										? this.setState({
												isStep1: false,
												isStep2: true,
												isStep3: false,
										  })
										: this.setState({
												isStep1: false,
												isStep2: false,
												isStep3: true,
										  });
								}}
							>
								{isStep3 ? "FINISH" : "NEXT "}
							</Button>
						</Grid>
						{isStep1 && (
							<Grid
								justify="center"
								container
								direction="row"
								className={classes.rightSide}
							>
								<Grid
									container
									direction="row"
									style={{
										height: "30%",
										alignItems: "center",
									}}
								>
									<Typography>
										Merchant ID Assigned
									</Typography>
									<TextField
										style={{ marginLeft: 30 }}
										variant="outlined"
										placeholder="Amazon"
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
