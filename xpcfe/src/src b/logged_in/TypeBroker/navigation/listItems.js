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
import SettingsIcon from '@material-ui/icons/Settings';
import {
	DashboardSvg,
	ConfigurationSvg,
	PartnersSvg,
	PoliciesSvg,
	SettingsSvg,
	TemplatesSvg,
} from '../../../shared/components/CustomSvgIcon';

const treeData = [
	{
		title: 'Dashboard',
		icon: <DashboardSvg />,
		link: '/c/dashboard',
		children: [],
	},
	{
		title: 'Sales',
		icon: <SendIcon />,
		// link: "/",
		children: [
			{
				title: 'Quotations',
				children: [],
				link: '/c/policies',
				icon: <SettingsIcon />,
			},
			{
				title: 'Policies',
				children: [],
				link: '/c/policies',
				icon: <PoliciesSvg />,
			},
			{
				title: 'Other Details',
				children: [],
				link: '/c/policies',
				icon: <PoliciesSvg />,
			},
		],
	},
	{
		title: 'Service',
		icon: <SendIcon />,
		// link: "/",
		children: [
			{
				title: 'Endorsements',
				icon: <SettingsIcon />,
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
		title: 'Developer',
		icon: <SendIcon />,
		link: '/c/merchant',
	},
	{
		title: 'Merchant',
		icon: <SendIcon />,
		link: '/c/merchant',
	},
	{
		title: 'Insurance Company',
		icon: <SendIcon />,
		link: '/c/merchant',
	},

	{
		title: 'Settings',
		icon: <SettingsSvg />,
		// link: "/",
		children: [
			{
				title: 'Profile',
				icon: <SettingsIcon />,
				link: '/c/profileSettings',
				children: [],
			},
			{
				title: 'Log Out',
				icon: <SettingsIcon />,
				link: '/c/profileSettings',
				children: [],
			},
		],
	},
];

const styles = (theme) => ({
	root: {
		width: '100%',
		color: 'white',
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
								<MyListItem
									data={child}
									classes={classes}
									key={index}
								/>
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
						<MyListItem
							data={node}
							classes={classes}
							key={index}
						/>
					))}
				</List>
			</div>
		);
	}
}
// export default Hello
export default withStyles(styles)(MyList);
