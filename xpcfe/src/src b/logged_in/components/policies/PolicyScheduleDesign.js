import React, { Component } from "react";
import {
	withStyles,
	Typography,
	Toolbar,
	Divider,
	Button,
	Box,
	TextField,
} from "@material-ui/core";
import dummyImg from "../../../shared/assets/png/dummyimage1.png";

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		marginLeft: 10,
	},
	header: {
		width: "auto",
		height: "auto",
		overflow: "visible",
		fontFamily: `"Avenir-Black", serif`,
		color: "#383b41",
		fontSize: 25,
		letterSpacing: 0,
		lineHeight: 2.2857142857142856,
		textAlign: "left",
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
	policyDesigns: {
		marginTop: 83,
	},
	// policyImg: { width: "16.5%", height: "16.5%", padding: 10 },
	policyImg: { width: 300, height: 260, padding: 10 },
	box: {
		boxSizing: "border-box",
		width: 190,
		height: 40,
		overflow: "visible",
		borderRadius: 8,
		border: "1px solid #c1c7d0",
	},
});
class PolicyScheduleDesign extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Typography className={classes.header}>
					POLICY DESIGNS
				</Typography>
				<Divider className={classes.divider} />

				<Button
					variant="contained"
					className={classes.button}
					href="/c/addPolicyDesign"
				>
					ADD A DESIGN
				</Button>
				<div className={classes.policyDesigns}>
					{[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
						<img
							src={dummyImg}
							alt="dummyImage"
							className={classes.policyImg}
						/>
					))}
				</div>
			</div>
		);
	}
}
export default withStyles(styles)(PolicyScheduleDesign);
