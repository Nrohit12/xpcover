import React, { Component } from "react";
import {
	withStyles,
	Typography,
	Divider,
	Button,
	FormControl,
	MenuItem,
	InputLabel,
	Select,
} from "@material-ui/core";
import dummyImg from "../../../shared/assets/png/dummyimage1.png";
import Table from "../dashboard/Table";
import SearchIcon from "@material-ui/icons/Search";

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		marginLeft: 32,
	},
	header: {
		width: "auto",
		height: "auto",
		overflow: "visible",

		color: "#383b41",
		fontSize: 14,
		letterSpacing: 0,
		lineHeight: 2.2857142857142856,
		textAlign: "left",
		fontWeight: 900,
	},
	divider: {
		width: 276,
		height: 2,
	},
	button: {
		width: 209,
		height: 52,
		overflow: "visible",
		backgroundColor: "#c1c7d0",
		position: "absolute",
		right: 32,
		color: "white",
	},
	productDesigns: {
		marginTop: 83,
		marginLeft: 14,
	},
	// policyImg: { width: "16.5%", height: "16.5%", padding: 10 },
	productImg: { width: 550, height: 350, padding: 16 },
	box: {
		boxSizing: "border-box",
		width: 190,
		height: 40,
		overflow: "visible",
		borderRadius: 8,
		border: "1px solid #c1c7d0",
	},
	formControl: {
		minWidth: 151,
		backgroundColor: "white",
		marginLeft: 32,
	},
});
class Merchant extends Component {
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
				<Typography className={classes.header}>
					MERCHANTS
				</Typography>
				<Divider className={classes.divider} />

				<Button
					variant="contained"
					className={classes.button}
					href="/c/createMerchant"
				>
					ADD A MERCHANT
				</Button>
				<div className={classes.productDesigns}>
					{[0, 1, 2].map((item) => (
						<img
							src={dummyImg}
							alt="dummyImage"
							className={classes.productImg}
						/>
					))}
				</div>

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

				<div style={{ marginRight: 32, marginTop: 32 }}>
					<Table />
				</div>
			</div>
		);
	}
}
export default withStyles(styles)(Merchant);
