import React, {
	useState,
	useCallback,
	useRef,
	Fragment,
	useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import {
	TextField,
	Button,
	Checkbox,
	Typography,
	FormControlLabel,
	withStyles,
	Snackbar,
	Grid,
} from '@material-ui/core';
import FormDialog from '../../../shared/components/FormDialog';
import HighlightedInformation from '../../../shared/components/HighlightedInformation';
import ButtonCircularProgress from '../../../shared/components/ButtonCircularProgress';
import VisibilityPasswordTextField from '../../../shared/components/VisibilityPasswordTextField';
import firebase from './firebase';
import man from './user.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';

import {
	GoogleSvg,
	GithubSvg,
} from './../../../shared/components/CustomSvgIcon';
const githubProvider = new firebase.auth.GithubAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const styles = (theme) => ({
	forgotPassword: {
		marginTop: theme.spacing(2),
		color: theme.palette.primary.main,
		cursor: 'pointer',
		'&:enabled:hover': {
			color: theme.palette.primary.dark,
		},
		'&:enabled:focus': {
			color: theme.palette.primary.dark,
		},
	},
	disabledText: {
		cursor: 'auto',
		color: theme.palette.text.disabled,
	},
	formControlLabel: {
		marginRight: 0,
	},
	loginTypeButton: {
		marginLeft: 16,
		marginTop: 5,
	},
});

function LoginDialog(props) {
	const {
		setStatus,
		history,
		classes,
		onClose,
		openChangePasswordDialog,
		status,
		pushMessageToSnackbar,
	} = props;
	const [isLoading, setIsLoading] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const loginEmail = useRef();
	const loginPassword = useRef();
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(true);
	};
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	// const login = useCallback(() => {
	//   setIsLoading(true);
	//   setStatus(null);
	//   if (loginEmail.current.value !== "test@web.com") {
	//     setTimeout(() => {
	//       setStatus("invalidEmail");
	//       setIsLoading(false);
	//     }, 1500);
	//   } else if (loginPassword.current.value !== "test") {
	//     setTimeout(() => {
	//       setStatus("invalidPassword");
	//       setIsLoading(false);
	//     }, 1500);
	//   } else {
	//     setTimeout(() => {
	//       history.push("/c/dashboard");
	//     }, 150);
	//   }
	// }, [setIsLoading, loginEmail, loginPassword, history, setStatus]);
	// // const [email, setEmail] = useState("test@gmail.com");
	// // const [password, setPassword] = useState("test123");

	// // const [value, setValue] = useState(localStorage.getItem("profileURL" || man));
	// // useEffect(() => {
	// //   if (value !== null) localStorage.setItem("profileURL", value);
	// //   else localStorage.setItem("profileURL", man);
	// // }, [value]);

	const loginAuth = async () => {
		try {
			setIsLoading(true);
			setStatus(null);
			if (firebase.apiKey !== 'REACT_APP_FIREBASE_KEY') {
				await firebase
					.auth()
					.signInWithEmailAndPassword(
						loginEmail.current.value,
						loginPassword.current.value,
					);
				setIsLoading(false);
				history.push('/c/dashboard');
			} else {
				history.push('/c/dashboard');
			}
		} catch (error) {
			setTimeout(() => {
				setIsLoading(false);
				alert(error);
			}, 200);
		}
	};

	const googleAuth = async () => {
		try {
			firebase
				.auth()
				.signInWithPopup(googleProvider)
				.then(function (result) {
					// setValue(result.user.photoURL);
					setTimeout(() => {
						history.push(
							`${process.env.PUBLIC_URL}/dashboard/default`,
						);
					}, 200);
				});
		} catch (error) {
			setTimeout(() => {
				toast.error(
					'Oppss.. The password is invalid or the user does not have a password.',
				);
			}, 200);
		}
	};

	const githubAuth = async () => {
		try {
			firebase
				.auth()
				.signInWithPopup(githubProvider)
				.then(function (result) {
					// setValue(result.user.photoURL);
					setTimeout(() => {
						history.push(
							`${process.env.PUBLIC_URL}/dashboard/default`,
						);
					}, 200);
				});
		} catch (error) {
			setTimeout(() => {
				toast.error(
					'Oppss.. The password is invalid or the user does not have a password.',
				);
			}, 200);
		}
	};
	return (
		<Fragment>
			<FormDialog
				open
				onClose={onClose}
				loading={isLoading}
				onFormSubmit={(e) => {
					e.preventDefault();
					loginAuth();
				}}
				hideBackdrop
				headline='Login'
				content={
					<Fragment>
						<TextField
							variant='outlined'
							margin='normal'
							error={status === 'invalidEmail'}
							required
							fullWidth
							label='Email Address'
							inputRef={loginEmail}
							autoFocus
							autoComplete='off'
							type='email'
							onChange={() => {
								if (status === 'invalidEmail') {
									setStatus(null);
								}
							}}
							helperText={
								status === 'invalidEmail' &&
								"This email address isn't associated with an account."
							}
							FormHelperTextProps={{ error: true }}
						/>
						<VisibilityPasswordTextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							error={status === 'invalidPassword'}
							label='Password'
							inputRef={loginPassword}
							autoComplete='off'
							onChange={() => {
								if (status === 'invalidPassword') {
									setStatus(null);
								}
							}}
							helperText={
								status === 'invalidPassword' ? (
									<span>
										Incorrect password. Try again,
										or click on{' '}
										<b>
											&quot;Forgot
											Password?&quot;
										</b>{' '}
										to reset it.
									</span>
								) : (
									''
								)
							}
							FormHelperTextProps={{ error: true }}
							onVisibilityChange={setIsPasswordVisible}
							isVisible={isPasswordVisible}
						/>
						<FormControlLabel
							className={classes.formControlLabel}
							control={<Checkbox color='primary' />}
							label={
								<Typography variant='body1'>
									Remember me
								</Typography>
							}
						/>
						{status === 'verificationEmailSend' ? (
							<HighlightedInformation>
								We have send instructions on how to
								reset your password to your email
								address
							</HighlightedInformation>
						) : (
							<HighlightedInformation>
								Email is:
								<b>xpcovertestuser@gmail.com</b>
								<br />
								Password is: <b>1234567890</b>
							</HighlightedInformation>
						)}
					</Fragment>
				}
				actions={
					<Fragment>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='secondary'
							disabled={isLoading}
							size='large'
						>
							Login
							{isLoading && <ButtonCircularProgress />}
						</Button>
						<div className={classes.loginTypeButton}>
							<Button
								href='/merchant/dashboard'
								// type='submit'
								// fullWidth
								variant='contained'
								color='secondary'
								disabled={isLoading}
							>
								Login As Merchant
								{isLoading && (
									<ButtonCircularProgress />
								)}
							</Button>
							<Button
								href='/broker/dashboard'
								// type='submit'
								// fullWidth
								variant='contained'
								color='secondary'
								disabled={isLoading}
								size='medium'
								style={{ marginLeft: 5 }}
							>
								Login As Broker
								{isLoading && (
									<ButtonCircularProgress />
								)}
							</Button>
						</div>

						<Typography
							align='center'
							className={classNames(
								classes.forgotPassword,
								isLoading ? classes.disabledText : null,
							)}
							color='primary'
							onClick={
								isLoading
									? null
									: openChangePasswordDialog
							}
							tabIndex={0}
							role='button'
							onKeyDown={(event) => {
								// For screenreaders listen to space and enter events
								if (
									(!isLoading &&
										event.keyCode === 13) ||
									event.keyCode === 32
								) {
									openChangePasswordDialog();
								}
							}}
						>
							Forgot Password?
						</Typography>
						<Grid
							container
							style={{
								justifyContent: ' center',
							}}
						>
							<IconButton
								aria-label='delete'
								onClick={() => googleAuth()}
							>
								<GoogleSvg />
							</IconButton>
							<IconButton
								aria-label='delete'
								onClick={() => githubAuth()}
							>
								<GithubSvg />
							</IconButton>
						</Grid>
					</Fragment>
				}
			/>
		</Fragment>
	);
}

LoginDialog.propTypes = {
	classes: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	setStatus: PropTypes.func.isRequired,
	openChangePasswordDialog: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	status: PropTypes.string,
};

export default withRouter(withStyles(styles)(LoginDialog));
