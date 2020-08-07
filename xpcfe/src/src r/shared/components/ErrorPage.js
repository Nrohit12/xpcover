import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		marginLeft: 10,
	},
});

class ErrorPage extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Typography>asd</Typography>
			</div>
		);
	}
}
export default withStyles(styles)(ErrorPage);
