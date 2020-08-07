import React, { Fragment } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { Typography } from "@material-ui/core";
// import fetch from "cross-fetch";

import CircularProgress from "@material-ui/core/CircularProgress";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export let dataToSendToParent = {};

export function AutoCompleteTextField() {
	return (
		<Autocomplete
			multiple
			id="checkboxes-tags-demo"
			options={top100Films}
			disableCloseOnSelect
			getOptionLabel={(option) => option.title}
			renderOption={(option, { selected }) => (
				<React.Fragment>
					<Checkbox
						icon={icon}
						checkedIcon={checkedIcon}
						style={{ marginRight: 8 }}
						checked={selected}
					/>
					{option.title}
				</React.Fragment>
			)}
			style={{ width: 500 }}
			renderInput={(params) => (
				<TextField
					{...params}
					variant="outlined"
					label="Checkboxes"
					placeholder="Favorites"
				/>
			)}
		/>
	);
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
	{ title: "The Shawshank Redemption", year: 1994 },
	{ title: "The Godfather", year: 1972 },
	{ title: "The Godfather: Part II", year: 1974 },
	{ title: "The Dark Knight", year: 2008 },
	{ title: "12 Angry Men", year: 1957 },
	{ title: "Schindler's List", year: 1993 },
	{ title: "Pulp Fiction", year: 1994 },
	{ title: "The Lord of the Rings: The Return of the King", year: 2003 },
	{ title: "The Good, the Bad and the Ugly", year: 1966 },
	{ title: "Fight Club", year: 1999 },
	{ title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
	{ title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
	{ title: "Forrest Gump", year: 1994 },
	{ title: "Inception", year: 2010 },
	{ title: "The Lord of the Rings: The Two Towers", year: 2002 },
	{ title: "One Flew Over the Cuckoo's Nest", year: 1975 },
	{ title: "Goodfellas", year: 1990 },
	{ title: "The Matrix", year: 1999 },
	{ title: "Seven Samurai", year: 1954 },
	{ title: "Star Wars: Episode IV - A New Hope", year: 1977 },
	{ title: "City of God", year: 2002 },
	{ title: "Se7en", year: 1995 },
	{ title: "The Silence of the Lambs", year: 1991 },
	{ title: "It's a Wonderful Life", year: 1946 },
	{ title: "Life Is Beautiful", year: 1997 },
	{ title: "The Usual Suspects", year: 1995 },
	{ title: "Léon: The Professional", year: 1994 },
	{ title: "Spirited Away", year: 2001 },
	{ title: "Saving Private Ryan", year: 1998 },
	{ title: "Once Upon a Time in the West", year: 1968 },
	{ title: "American History X", year: 1998 },
	{ title: "Interstellar", year: 2014 },
];

function sleep(delay = 0) {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
}
export function AsynchronousSingle({ label, itemId, clear }) {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState([]);
	const loading = open && options.length === 0;
	if (clear) {
		dataToSendToParent = {};
	}

	React.useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			const response = await fetch(
				"https://country.register.gov.uk/records.json?page-size=5000"
			);
			await sleep(1e3); // For demo purposes.
			const countries = await response.json();

			if (active) {
				setOptions(
					Object.keys(countries).map(
						(key) => countries[key].item[0]
					)
				);
			}
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	return (
		<Autocomplete
			onChange={(event, values) => {
				dataToSendToParent[itemId] = values;
				console.log(dataToSendToParent);
			}}
			id="asynchronous-demo"
			style={{ width: 300 }}
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			getOptionSelected={(option, value) => option.name === value.name}
			getOptionLabel={(option) => option.name}
			options={options}
			loading={loading}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					variant="outlined"
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<React.Fragment>
								{loading ? (
									<CircularProgress
										color="inherit"
										size={20}
									/>
								) : null}
								{params.InputProps.endAdornment}
							</React.Fragment>
						),
					}}
				/>
			)}
		/>
	);
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
				"https://country.register.gov.uk/records.json?page-size=5000"
			);
			await sleep(1e3); // For demo purposes.
			const countries = await response.json();

			if (active) {
				setOptions(
					Object.keys(countries).map(
						(key) => countries[key].item[0]
					)
				);
			}
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	return (
		<Autocomplete
			onChange={(event, values) => {
				item.data = values;
				dataToSendToParent[item.id] = item.data;
				console.log(dataToSendToParent);
			}}
			id="asynchronous-demo"
			style={{ width: 300 }}
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			getOptionSelected={(option, value) => option.name === value.name}
			getOptionLabel={(option) => option.name}
			options={options}
			loading={loading}
			renderInput={(params) => (
				<React.Fragment>
					<TextField
						{...params}
						label={item.placeHold}
						variant="outlined"
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<React.Fragment>
									{loading ? (
										<CircularProgress
											color="inherit"
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
			multiple
			disableCloseOnSelect

			// renderInput={(params) => (
			// 	<TextField
			// 		{...params}
			// 		variant="outlined"
			// 		label="Checkboxes"
			// 		placeholder="Favorites"
			// 	/>
			// )}
		/>
	);
}
