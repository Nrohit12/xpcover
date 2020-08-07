import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SendIcon from '@material-ui/icons/Send';
import {
	DashboardSvg,
	ConfigurationSvg,
	PartnersSvg,
	PoliciesSvg,
	SettingsSvg,
	TemplatesSvg,
} from '../../../shared/components/CustomSvgIcon';
import HomeIcon from '@material-ui/icons/Home';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RateReviewIcon from '@material-ui/icons/RateReview';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const treeData = [
	{
		title: 'Dashboard',
		icon: <HomeIcon />,
		link: '/c/dashboard',
		children: [],
	},
	{
		title: 'Sales',
		icon: <FolderOpenIcon />,
		// link: "/",
		children: [
			{
				title: 'Quotations',
				children: [],
				link: '/c/policies',
				icon: <MailOutlineIcon />,
			},
			{
				title: 'Policies',
				children: [],
				link: '/c/policies',
				icon: <AddIcon />,
			},
		],
	},
	{
		title: 'Service',
		icon: <BusinessCenterIcon />,
		// link: "/",
		children: [
			{
				title: 'Endorsements',
				icon: <PersonOutlineIcon />,
				link: '/c/configurations',
				children: [],
			},
			{
				title: 'Cancellations',
				icon: <SettingsIcon />,
				link: '/',
				children: [],
			},
			{
				title: 'Claims',
				icon: <SettingsIcon />,
				link: '/',
				children: [],
			},
		],
	},
	{
		title: 'Merchant',
		icon: <AssignmentIcon />,
		link: '/c/merchant',
	},
	{
		title: 'Insurance Company',
		icon: <RateReviewIcon />,
		link: '/c/insurance',
	},
	{
		title: 'Configuration',
		icon: <AccessTimeIcon />,
		// link: "/",
		children: [
			{
				title: 'Product',
				icon: <SettingsIcon />,
				link: '/c/product',
				children: [],
			},
			{
				title: 'Policy Schedule',
				icon: <AddIcon />,
				link: '/c/policyScheduleDesign',
				children: [],
			},
			{
				title: 'Email',
				icon: <MailOutlineIcon />,
				link: '/',
				children: [],
			},
		],
	},
	{
		title: 'Settings',
		icon: <SettingsIcon />,
		// link: "/",
		children: [
			{
				title: 'Profile ',
				icon: <AccountCircleIcon />,
				link: '/profileSettings',
				children: [],
			},
		],
	},
];

const styles = (theme) => ({
	root: {
		width: '100%',
		color: 'black',
	},
	nested: {
		paddingLeft: theme.spacing.unit * 2,
	},
});

class MyListItem extends Component {
	state = {
		open: false,
	};

	toggleSub = () => {
		this.setState({
			open: !this.state.open,
		});
	};

	render() {
		const { classes } = this.props;
		const { title, children, icon, link } = this.props.data;
		const haveChildren = children && children.length > 0;
		return (
			<List component='div'>
				<ListItem
					onClick={this.toggleSub}
					button
					key={title}
					component='a'
					href={link}
				>
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemText primary={title} />
					{haveChildren ? (
						this.state.open ? (
							<ExpandLess />
						) : (
							<ExpandMore />
						)
					) : (
						''
					)}
				</ListItem>
				{haveChildren ? (
					<Collapse
						in={this.state.open}
						timeout='auto'
						style={{ marginLeft: 10, marginRight: 10 }}
					>
						<List className={classes.nested}>
							{children.map((child, index) => (
								<MyListItem data={child} classes={classes} key={index} />
							))}
						</List>
					</Collapse>
				) : (
					''
				)}
			</List>
		);
	}
}
class MyList extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<List>
					{treeData.map((node, index) => (
						<MyListItem data={node} classes={classes} key={index} />
					))}
				</List>
			</div>
		);
	}
}
// export default Hello
export default withStyles(styles)(MyList);
