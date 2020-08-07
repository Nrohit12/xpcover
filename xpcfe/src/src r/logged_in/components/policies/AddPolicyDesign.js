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
import LinearBuffer from '../../../shared/components/LinerBuffer';

const styles = (theme) => ({
	subRoot: {
		flexGrow: 1,
		marginLeft: 20,
	},
	root: {
		padding: theme.spacing(2),

		color: theme.palette.text.secondary,
	},
	leftSide: {
		width: 600,
		marginBottom: 20,
	},
	rightSide: {
		width: 300,
	},
	gridTypo: {
		width: 240,
		fontSize: 16,
		fontWeight: 900,
		alignSelf: 'center',
		fontFamily: `"Avenir-Black", serif`,
	},
	image: {
		width: 300,
		height: 200,
	},
	input: {
		display: 'none',
	},
	heading: {
		fonteight: 900,
		overflow: 'visible',
		fontFamily: `"Avenir-Black", serif`,
		color: '#383b41',
		fontSize: 24,
		letterSpacing: 0,
		textAlign: 'center',
	},
	box: {
		boxSizing: 'border-box',
		width: 'auto',
		height: 'auto',
		overflow: 'visible',
		borderRadius: 8,
		border: '1px solid #c1c7d0',
		// alignItems: "center",
		// alignContent: "center",
		// justifyItems: "center",
		// justifyContent: "center",
		padding: 4,
	},
	linearBuffer: {
		width: 250,
		marginLeft: 250,

		marginTop: 10,
	},
});

const data = [
	{ typo: ' Select Product', placeHold: 'Travel Insurance ' },
	{ typo: ' Select Insurance Company', placeHold: 'Bharti AXA GI ' },
	{ typo: ' Select Partner', placeHold: 'LG ' },
	{ typo: ' Select Language', placeHold: 'Hindi ' },
];

class AddPolicyDesign extends Component {
	constructor(props) {
		super();
		this.state = {
			isStep1: true,
			isStep2: false,
			isStep3: false,
			isProgressBar: false,
			isRightSide: false,
			isRightSideSubPart: false,
		};
	}
	render() {
		const { classes } = this.props;
		const {
			isProgressBar,
			isStep1,
			isStep2,
			isStep3,
			isRightSide,
			isRightSideSubPart,
		} = this.state;

		return (
			<div>
				<div className={classes.root}>
					<Toolbar>
						<Typography variant='h4' className={classes.heading}>
							Add Policy Design
						</Typography>
					</Toolbar>

					<div className={classes.subRoot}>
						<Grid container direction='row'>
							<Grid item direction='column' className={classes.leftSide}>
								{data.map((item) => (
									<Grid container direction='row' style={{ padding: 10 }}>
										<Typography className={classes.gridTypo}>
											{item.typo}
										</Typography>

										<TextField
											style={{
												backgroundColor: 'white',
											}}
											variant='outlined'
											placeholder={item.placeHold}
											InputProps={{
												endAdornment: (
													<InputAdornment>
														<IconButton>
															<SearchIcon />
														</IconButton>
													</InputAdornment>
												),
											}}
										/>
									</Grid>
								))}
								<Grid container direction='row'>
									<Typography
										style={{ marginLeft: 10 }}
										className={classes.gridTypo}
									>
										Upload HTML Design
									</Typography>
									<Box style={{}} className={classes.box}>
										<input
											accept='image/*'
											className={classes.input}
											id='contained-button-file'
											multiple
											type='file'
										/>
										<label htmlFor='contained-button-file'>
											<Button
												variant='contained'
												color='primary'
												component='span'
												type='file'
												onClick={() =>
													this.setState({
														isProgressBar: true,
														isRightSide: true,
													})
												}
											>
												UPLOAD FILE
											</Button>
										</label>
									</Box>
								</Grid>

								{isProgressBar && (
									<div className={classes.linearBuffer}>
										<LinearBuffer />
									</div>
								)}

								<Button
									className={classes.uploadBtn}
									style={{
										marginLeft: 250,
										width: 250,
										marginTop: 10,
									}}
									variant='contained'
									color='primary'
									component='span'
								>
									ADD DESIGN
								</Button>
							</Grid>
							{isRightSide && (
								<Grid item direction='column' className={classes.rightSide}>
									<img
										src={dummyImg}
										alt='dummyImage'
										className={classes.image}
									/>

									<Grid container direction='row' justify='space-between'>
										<Button
											style={{ width: 130 }}
											variant='contained'
											color='primary'
											endIcon={<SearchIcon />}
										>
											PREVIEW
										</Button>
										<Button
											style={{ width: 130 }}
											variant='contained'
											color='primary'
											onClick={() =>
												this.setState({
													isRightSideSubPart: true,
												})
											}
										>
											ACTIVATE
										</Button>
									</Grid>

									{isRightSideSubPart && (
										<Grid container direction='column'>
											<TextField
												variant='outlined'
												placeholder='Add a Name'
												style={{
													marginTop: 10,
													backgroundColor: 'white',
													width: '80%',
												}}
											/>
											<Button
												variant='contained'
												color='primary'
												style={{
													marginTop: 10,
													width: '80%',
												}}
											>
												CONFIRM
											</Button>
										</Grid>
									)}
								</Grid>
							)}
						</Grid>
					</div>
				</div>
			</div>
		);
	}
}
export default withStyles(styles)(AddPolicyDesign);
