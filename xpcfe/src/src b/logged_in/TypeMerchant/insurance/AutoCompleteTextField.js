import React, { Fragment } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Typography } from '@material-ui/core';
// import fetch from "cross-fetch";

import CircularProgress from '@material-ui/core/CircularProgress';

// const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
// const checkedIcon = <CheckBoxIcon fontSize='small' />;
export let dataToSendToParent = {};

function sleep(delay = 0) {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
}
export function AsynchronousMultiple({ item }) {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState([]);
	const loading = open && options.length === 0;

	React.useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			const response = await fetch(
				item.id === 'select_insurance_product'
					? 'http://4944e1f922d3.ngrok.io/showProduct'
					: 'https://country.register.gov.uk/records.json?page-size=5000',
			);
			await sleep(1e3); // For demo purposes.
			const data = await response.json();
			console.log(data);

			if (active) {
				setOptions(
					item.id === 'select_insurance_product'
						? data.map((item) => item)
						: Object.keys(data).map(
								(key) => data[key].item[0],
						  ),
				);
			}
			if (active) {
			}
			console.log('option' + options);
		})();

		return () => {
			active = false;
		};
	}, [item.id, loading, options]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	return (
		<Autocomplete
			onChange={(event, values) =>
				item.id === 'select_insurance_product'
					? (dataToSendToParent[item.id] = values.map(
							(x) => x.insurance_product_id,
					  ))
					: (dataToSendToParent[item.id] = values)
			}
			id='asynchronous-demo'
			style={{ width: 300 }}
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			getOptionSelected={(option, value) =>
				item.id === 'select_insurance_product'
					? option.product_name === value.product_name
					: option.name === value.name
			}
			getOptionLabel={(option) =>
				item.id === 'select_insurance_product'
					? option.product_name
					: option.name
			}
			options={options}
			loading={loading}
			renderInput={(params) => (
				<React.Fragment>
					<TextField
						{...params}
						style={{ backgroundColor: 'white' }}
						label={item.placeHold}
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
									{params.InputProps.endAdornment}
								</React.Fragment>
							),
						}}
					/>
				</React.Fragment>
			)}
			multiple={item.id === 'country_present_in' ? false : true}
			disableCloseOnSelect
		/>
	);
}

// export function AutoCompleteTextField() {
// 	return (
// 		<Autocomplete
// 			id='checkboxes-tags-demo'
// 			options={top100Films}
// 			disableCloseOnSelect
// 			getOptionLabel={(option) => option.title}
// 			renderOption={(option, { selected }) => (
// 				<React.Fragment>
// 					<Checkbox
// 						icon={icon}
// 						checkedIcon={checkedIcon}
// 						style={{ marginRight: 8 }}
// 						checked={selected}
// 					/>
// 					{option.title}
// 				</React.Fragment>
// 			)}
// 			style={{ width: 500 }}
// 			renderInput={(params) => (
// 				<TextField
// 					{...params}
// 					variant='outlined'
// 					label='Checkboxes'
// 					placeholder='Favorites'
// 				/>
// 			)}
// 		/>
// 	);
// }

// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
// 	{ title: 'The Shawshank Redemption', year: 1994 },
// 	{ title: 'The Godfather', year: 1972 },
// 	{ title: 'The Godfather: Part II', year: 1974 },
// 	{ title: 'The Dark Knight', year: 2008 },
// 	{ title: '12 Angry Men', year: 1957 },
// 	{ title: "Schindler's List", year: 1993 },
// 	{ title: 'Pulp Fiction', year: 1994 },
// 	{ title: 'The Lord of the Rings: The Return of the King', year: 2003 },
// 	{ title: 'The Good, the Bad and the Ugly', year: 1966 },
// 	{ title: 'Fight Club', year: 1999 },
// 	{ title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
// 	{ title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
// 	{ title: 'Forrest Gump', year: 1994 },
// 	{ title: 'Inception', year: 2010 },
// 	{ title: 'The Lord of the Rings: The Two Towers', year: 2002 },
// 	{ title: "One Flew Over the Cuckoo's Nest", year: 1975 },
// 	{ title: 'Goodfellas', year: 1990 },
// 	{ title: 'The Matrix', year: 1999 },
// 	{ title: 'Seven Samurai', year: 1954 },
// 	{ title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
// 	{ title: 'City of God', year: 2002 },
// 	{ title: 'Se7en', year: 1995 },
// 	{ title: 'The Silence of the Lambs', year: 1991 },
// 	{ title: "It's a Wonderful Life", year: 1946 },
// 	{ title: 'Life Is Beautiful', year: 1997 },
// 	{ title: 'The Usual Suspects', year: 1995 },
// 	{ title: 'Léon: The Professional', year: 1994 },
// 	{ title: 'Spirited Away', year: 2001 },
// 	{ title: 'Saving Private Ryan', year: 1998 },
// 	{ title: 'Once Upon a Time in the West', year: 1968 },
// 	{ title: 'American History X', year: 1998 },
// 	{ title: 'Interstellar', year: 2014 },
// ];

// export function AsynchronousSingle({ label, itemId, clear }) {
// 	const [open, setOpen] = React.useState(false);
// 	const [options, setOptions] = React.useState([]);
// 	const loading = open && options.length === 0;
// 	if (clear) {
// 		dataToSendToParent = {};
// 	}

// 	React.useEffect(() => {
// 		let active = true;

// 		if (!loading) {
// 			return undefined;
// 		}

// 		(async () => {
// 			const response = await fetch(
// 				'http://de4f615904e3.ngrok.io/addProduct/data',
// 			);
// 			await sleep(1e3); // For demo purposes.
// 			const countries = await response.json();
// 			console.log(countries);
// 			let data_type = {};
// 			data_type = countries[itemId];

// 			if (active) {
// 				setOptions(
// 					Object.keys(data_type).map((key) => data_type[key]),
// 				);
// 			}
// 		})();

// 		return () => {
// 			active = false;
// 		};
// 	}, [itemId, loading]);

// 	React.useEffect(() => {
// 		if (!open) {
// 			setOptions([]);
// 		}
// 	}, [open]);

// 	return (
// 		<Autocomplete
// 			onChange={(event, values) => {
// 				dataToSendToParent[itemId] = values;
// 				console.log('dataToSendToParent: ' + dataToSendToParent);
// 			}}
// 			id='asynchronous-demo'
// 			style={{ width: 300 }}
// 			open={open}
// 			onOpen={() => {
// 				setOpen(true);
// 			}}
// 			onClose={() => {
// 				setOpen(false);
// 			}}
// 			getOptionSelected={(option, value, index) => option === value}
// 			getOptionLabel={(option) => option}
// 			options={options}
// 			loading={loading}
// 			renderInput={(params) => (
// 				<TextField
// 					{...params}
// 					label={label}
// 					variant='outlined'
// 					InputProps={{
// 						...params.InputProps,
// 						endAdornment: (
// 							<React.Fragment>
// 								{loading ? (
// 									<CircularProgress
// 										color='inherit'
// 										size={20}
// 									/>
// 								) : null}
// 								{params.InputProps.endAdornment}
// 							</React.Fragment>
// 						),
// 					}}
// 				/>
// 			)}
// 		/>
// 	);
// }
