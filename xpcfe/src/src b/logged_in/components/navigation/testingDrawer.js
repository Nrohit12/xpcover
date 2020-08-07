import React, { Fragment, useRef, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
	AppBar,
	Toolbar,
	Typography,
	Avatar,
	Drawer,
	List,
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemText,
	Hidden,
	Tooltip,
	Box,
	withStyles,
	isWidthUp,
	Popover,
	withWidth,
	TextareaAutosize,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ImageIcon from '@material-ui/icons/Image';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import MenuIcon from '@material-ui/icons/Menu';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MessagePopperButton from './MessagePopperButton';
import SideDrawer from './SideDrawer';
import Balance from './Balance';
import NavigationDrawer from '../../../shared/components/NavigationDrawer';
import profilePicture from '../../dummy_data/images/profilePicture.jpg';
import PolicyIcon from '@material-ui/icons/Policy';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import clsx from 'clsx';
import SettingsIcon from '@material-ui/icons/Settings';
import FaceIcon from '@material-ui/icons/Face';
import NestedList from './listItems';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
const styles = (theme) => ({
	appBar: {
		boxShadow: theme.shadows[6],
		backgroundColor: theme.palette.common.white,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			marginLeft: 0,
		},
	},
	appBarToolbar: {
		display: 'flex',
		justifyContent: 'space-between',
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
		[theme.breakpoints.up('sm')]: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
		},
		[theme.breakpoints.up('md')]: {
			paddingLeft: theme.spacing(3),
			paddingRight: theme.spacing(3),
		},
		[theme.breakpoints.up('lg')]: {
			paddingLeft: theme.spacing(4),
			paddingRight: theme.spacing(4),
		},
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
	drawerPaper: {
		height: '100%vh',
		whiteSpace: 'nowrap',
		border: 0,
		width: 280,
		overflowX: 'hidden',
		marginTop: theme.spacing(8),
		// [theme.breakpoints.up("sm")]: {
		//   width: theme.spacing(9),
		// },
		backgroundColor: theme.palette.common.black,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
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
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),

		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
	menuButton: {
		marginLeft: 15,
		color: theme.palette.primary.main,
	},
	menuButtonHidden: {
		marginLeft: 15,
		display: 'none',
	},
});

function NavBar(props) {
	const {
		selectedTab,
		messages,
		classes,
		width,
		openAddBalanceDialog,
	} = props;
	// Will be use to make website more accessible by screen readers
	const links = useRef([]);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

	const openMobileDrawer = useCallback(() => {
		setIsMobileOpen(true);
	}, [setIsMobileOpen]);

	const closeMobileDrawer = useCallback(() => {
		setIsMobileOpen(false);
	}, [setIsMobileOpen]);

	const openDrawer = useCallback(() => {
		setIsSideDrawerOpen(true);
	}, [setIsSideDrawerOpen]);

	const closeDrawer = useCallback(() => {
		setIsSideDrawerOpen(false);
	}, [setIsSideDrawerOpen]);

	const anchorEl = useRef();
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen, setIsOpen]);

	const handleClickAway = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);
	const id = isOpen ? 'scroll-playground' : null;

	const [open, setOpen] = React.useState(false);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Fragment>
			<AppBar position='sticky' className={classes.appBar}>
				<Toolbar className={classes.appBarToolbar}>
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
			<Hidden xsDown>
				<Drawer
					variant='permanent'
					classes={{
						paper: clsx(
							classes.drawerPaper,
							!open && classes.drawerPaperClose,
						),
					}}
					open={open}
				>
					<div className={classes.toolbarIcon}>
						{/* TO DOOOOOOOOOOOOO */}
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerClose}
							className={clsx(
								classes.menuButton,
								!open && classes.menuButtonHidden,
							)}
						>
							<ChevronLeftIcon />
						</IconButton>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							className={clsx(
								classes.menuButton,
								open && classes.menuButtonHidden,
							)}
						>
							<MenuIcon />
						</IconButton>
					</div>
					<Divider />

					<NestedList />
				</Drawer>
			</Hidden>{' '}
		</Fragment>
	);
}

NavBar.propTypes = {
	messages: PropTypes.arrayOf(PropTypes.object).isRequired,
	selectedTab: PropTypes.string.isRequired,
	width: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	openAddBalanceDialog: PropTypes.func.isRequired,
};

export default withWidth()(withStyles(styles, { withTheme: true })(NavBar));
