import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core/";
import { Grid, Divider } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";

import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import dummyImg from "../../../shared/assets/png/dummyimage1.png";
import Table from "./Table";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		marginLeft: 46,
	},
	paper: {
		height: 140,
		width: 100,
	},
	image: {
		width: 300,
		height: 200,
		marginLeft: 20,
		marginBottom: 20,
	},
	img: {
		width: 400,
		height: 300,
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 151,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	table: {
		width: "70%",
		marginRight: 32,
		marginTop: 32,
	},
	shortcut: {
		padding: 30,
	},
	dataBoxes: { marginTop: 73 },
	heading: {
		fontSize: 16,
		fontWeight: 900,
	},
	divider: {
		width: 400,
		height: 2,
	},
});

class defaultDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = { age: null };
	}
	handleChange = (event) => {
		this.setState({ age: event.target.value });
	};
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Typography className={classes.heading}>
					Dashboard
				</Typography>
				<Divider className={classes.divider} />
				<Fragment>
					{/* <Paper style={{ padding: 20, marginTop: 20 }}> */}
					<Grid
						className={classes.dataBoxes}
						container
						direction="row"
					>
						<img
							src={dummyImg}
							alt="dummyImage"
							className={classes.image}
						/>
						<img
							src={dummyImg}
							alt="dummyImage"
							className={classes.image}
						/>
						<img
							src={dummyImg}
							alt="dummyImage"
							className={classes.image}
						/>
					</Grid>
					{/* </Paper> */}

					{/* <Paper style={{ padding: 20, marginTop: 20 }}> */}
					<Grid
						container
						direction="row"
						style={{ marginTop: 20, marginLeft: 20 }}
					>
						<img
							src={dummyImg}
							alt="dummyImage"
							className={classes.img}
						/>
					</Grid>
					{/* </Paper> */}
				</Fragment>

				<Fragment>
					<div style={{ marginTop: 20 }}>
						<FormControl
							variant="outlined"
							className={classes.formControl}
						>
							<InputLabel id="demo-simple-select-label">
								select month
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={this.state.age}
								onChange={this.handleChange}
							>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>
						<FormControl
							variant="outlined"
							className={classes.formControl}
						>
							<InputLabel id="demo-simple-select-label">
								select country
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={this.state.age}
								onChange={this.handleChange}
							>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>
						<FormControl
							variant="outlined"
							className={classes.formControl}
						>
							<InputLabel id="demo-simple-select-label">
								status
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={this.state.age}
								onChange={this.handleChange}
							>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>

						<Grid container direction="row">
							<Grid item className={classes.table}>
								<Table />
							</Grid>

							<Grid
								item
								direction="column"
								className={classes.shortcut}
							>
								<Typography variant="h6">
									SHORTCUT
								</Typography>
								<Grid
									container
									direction="column"
									style={{ marginTop: 20 }}
								>
									<Button
										href="/c/createMerchant"
										variant="outlined"
										color="primary"
										startIcon={<DeleteIcon />}
									>
										CREATE MERCHANT
									</Button>

									<Button
										href="/c/createInsurance"
										style={{ marginTop: 10 }}
										variant="outlined"
										color="primary"
										startIcon={<DeleteIcon />}
									>
										CREATE INSURANCE CO.
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</div>
				</Fragment>
			</div>
		);
	}
}
export default withStyles(styles)(defaultDashboard);
