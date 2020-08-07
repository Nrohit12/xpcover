import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Switch, Router, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Dashboard from './dashboard/Dashboard';
import Posts from './posts/Posts';
import Subscription from './subscription/Subscription';
import PropsRoute from '../../shared/components/PropsRoute';
import Dash from '../.././dashboard';
// import Dummy from './dummydesign';
import defaultDashboard from './dashboard/defaultDashboard';
import AddPolicyDesign from './policies/AddPolicyDesign';
import CreateMerchant from './merchant/createMerchant';
import Merchant from './merchant/Merchant';
import PolicyScheduleDesign from './policies/PolicyScheduleDesign';
import Policies from './policies/Policies';
import Profile from './settings/Profile';
import Insurance from './insurance/Insurance';

import CreateInsurance from './insurance/createInsurance';
import Product from './configurations/Product';
import AddProduct from './configurations/AddProduct';
import AddProductNameDetails from './configurations/AddProductNameDetails';
import postdata from '../../postdata';

const styles = (theme) => ({
	wrapper: {
		margin: theme.spacing(1),
		width: 'auto',
		[theme.breakpoints.up('xs')]: {
			width: '95%',
			marginLeft: 'auto',
			marginRight: 'auto',
			// marginTop: theme.spacing(4),
			marginBottom: theme.spacing(4),
		},

		[theme.breakpoints.up('sm')]: {
			// marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			width: '90%',
			marginLeft: 'auto',
			marginRight: 'auto',
		},
		[theme.breakpoints.up('md')]: {
			// marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			width: '82.5%',
			marginLeft: 'auto',
			marginRight: 'auto',
		},
		[theme.breakpoints.up('lg')]: {
			// marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			width: 'auto',
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
});

function Routing(props) {
	const {
		classes,
		EmojiTextArea,
		ImageCropper,
		Dropzone,
		DateTimePicker,
		pushMessageToSnackbar,
		posts,
		transactions,
		toggleAccountActivation,
		CardChart,
		statistics,
		targets,
		setTargets,
		setPosts,
		isAccountActivated,
		selectDashboard,
		selectPosts,
		selectSubscription,
		openAddBalanceDialog,
	} = props;
	return (
		<div className={classes.wrapper}>
			<Switch>
				<PropsRoute
					path='/c/addPolicyDesign'
					component={AddPolicyDesign}
				/>
				<PropsRoute path='/c/merchant' component={Merchant} />
				<PropsRoute
					path='/c/createMerchant'
					component={CreateMerchant}
				/>
				<PropsRoute path='/c/policies' component={Policies} />
				<PropsRoute
					path='/c/policyScheduleDesign'
					component={PolicyScheduleDesign}
				/>
				<PropsRoute path='/c/Insurance' component={Insurance} />
				<PropsRoute
					path='/c/createInsurance'
					component={CreateInsurance}
				/>
				<PropsRoute path='/c/profileSettings' component={Profile} />
				<PropsRoute path='/c/product' component={Product} />
				<PropsRoute path='/c/addProduct' component={AddProduct} />
				<PropsRoute path='/c/dummyapi' component={postdata} />

				<PropsRoute
					path='/c/configurations'
					component={Subscription}
					transactions={transactions}
					pushMessageToSnackbar={pushMessageToSnackbar}
					selectSubscription={selectSubscription}
					openAddBalanceDialog={openAddBalanceDialog}
				/>
				<PropsRoute
					path=''
					component={defaultDashboard}
					toggleAccountActivation={toggleAccountActivation}
					pushMessageToSnackbar={pushMessageToSnackbar}
					CardChart={CardChart}
					statistics={statistics}
					targets={targets}
					setTargets={setTargets}
					isAccountActivated={isAccountActivated}
					selectDashboard={selectDashboard}
				/>
			</Switch>
		</div>
	);
}

Routing.propTypes = {
	classes: PropTypes.object.isRequired,
	EmojiTextArea: PropTypes.elementType,
	ImageCropper: PropTypes.elementType,
	Dropzone: PropTypes.elementType,
	DateTimePicker: PropTypes.elementType,
	pushMessageToSnackbar: PropTypes.func,
	setTargets: PropTypes.func.isRequired,
	setPosts: PropTypes.func.isRequired,
	posts: PropTypes.arrayOf(PropTypes.object).isRequired,
	transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
	toggleAccountActivation: PropTypes.func,
	CardChart: PropTypes.elementType,
	statistics: PropTypes.object.isRequired,
	targets: PropTypes.arrayOf(PropTypes.object).isRequired,
	isAccountActivated: PropTypes.bool.isRequired,
	selectDashboard: PropTypes.func.isRequired,
	selectPosts: PropTypes.func.isRequired,
	selectSubscription: PropTypes.func.isRequired,
	openAddBalanceDialog: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Routing));
