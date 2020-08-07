import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Hidden, Box, Avatar } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Routing from '../Routing';
import NestedList from './listItems';
import SettingsIcon from '@material-ui/icons/Settings';
import MessagePopperButton from './MessagePopperButton';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import profilePicture from '../../dummy_data/images/profilePicture.jpg';
import fetch from 'cross-fetch';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		backgroundColor: 'white',
		height: '64',
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	accountAvatar: {
		backgroundColor: theme.palette.secondary.main,
		height: 24,
		width: 24,
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.down('xs')]: {
			marginLeft: theme.spacing(1.5),
			marginRight: theme.spacing(1.5),
		},
	},
	menuButton: {
		marginRight: 36,
		color: 'black',
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		backgroundColor: theme.palette.common.black,
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},

	smBordered: {
		[theme.breakpoints.down('xs')]: {
			borderRadius: '50% !important',
		},
	},
	menuLink: {
		textDecoration: 'none',
		color: theme.palette.text.primary,
	},
	iconListItem: {
		width: 'auto',
		borderRadius: theme.shape.borderRadius,
		paddingTop: 11,
		paddingBottom: 11,
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	textPrimary: {
		color: theme.palette.primary.main,
	},
	mobileItemSelected: {
		backgroundColor: `${theme.palette.primary.main} !important`,
	},
	brandText: {
		fontFamily: "'Baloo Bhaijaan', cursive",
		fontWeight: 400,
	},
	username: {
		paddingLeft: 0,
		paddingRight: theme.spacing(2),
	},
	justifyCenter: {
		justifyContent: 'center',
	},
	permanentDrawerListItem: {
		justifyContent: 'center',
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	popoverPaper: {
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(1),
	},
	menuButtonHidden: {
		marginLeft: 15,
		display: 'none',
	},
}));

// for asynchronoous Autocomplete
function sleep(delay = 0) {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
}

export default function MiniDrawer(props) {
	const { messages } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	// for asynchronoous Autocomplete
	const [AutoCompleteopen, setAutoCompleteOpen] = React.useState(false);
	const [options, setOptions] = React.useState([]);
	const loading = AutoCompleteopen && options.length === 0;

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleClick = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen, setIsOpen]);

	// for asynchronoous Autocomplete
	React.useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			const response = await fetch(
				'https://country.register.gov.uk/records.json?page-size=5000',
			);
			await sleep(1e3); // For demo purposes.
			const countries = await response.json();

			if (active) {
				setOptions(
					Object.keys(countries).map(
						(key) => countries[key].item[0],
					),
				);
			}
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	React.useEffect(() => {
		if (!AutoCompleteopen) {
			setOptions([]);
		}
	}, [AutoCompleteopen]);

	return (
		<div className={classes.root}>
			<AppBar
				position='fixed'
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					{/* Menu Icon */}
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon />
					</IconButton>

					{/* XP Cover on Menu */}
					<Box display='flex' alignItems='center'>
						<Box mr={1}></Box>
						<Hidden xsDown>
							<Typography
								variant='h4'
								className={classes.brandText}
								display='inline'
								color='primary'
							>
								XP
							</Typography>

							<Typography
								style={{ marginLeft: 6 }}
								variant='h4'
								className={classes.brandText}
								display='inline'
								color='secondary'
							>
								Cover
							</Typography>
						</Hidden>
					</Box>

					<Autocomplete
						id='asynchronous-demo'
						style={{ width: 328, marginLeft: 100 }}
						AutoCompleteopen={AutoCompleteopen}
						onOpen={() => {
							setAutoCompleteOpen(true);
						}}
						onClose={() => {
							setAutoCompleteOpen(false);
						}}
						getOptionSelected={(option, value) =>
							option.name === value.name
						}
						getOptionLabel={(option) => option.name}
						options={options}
						loading={loading}
						renderInput={(params) => (
							<TextField
								{...params}
								label='Search'
								variant='outlined'
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<React.Fragment>
											{loading ? (
												<CircularProgress
													color='inherit'
													size={20}
												/>
											) : null}
											{
												params.InputProps
													.endAdornment
											}
										</React.Fragment>
									),
								}}
							/>
						)}
					/>

					{/* Profile Picture and Logout Button */}
					<Box
						display='flex'
						justifyContent='flex-end'
						alignItems='center'
						width='100%'
					>
						<MessagePopperButton messages={messages} />
						<IconButton
							href='/c/profileSettings'
							onClick={handleClick}
							color='primary'
						>
							<Avatar
								alt='profile picture'
								src={profilePicture}
							/>
						</IconButton>
						<IconButton href='/'>
							<PowerSettingsNewIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			<Drawer
				variant='permanent'
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<NestedList />
			</Drawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Routing />
			</main>
		</div>
	);
}
