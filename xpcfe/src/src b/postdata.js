import React, { Component } from "react";
import { Button } from "@material-ui/core";

export default class postdata extends Component {
	async postData() {
		try {
			let result = await fetch(
				"https://webhook.site/f38a3110-07c3-4e98-8b17-879e3c6afa6a",
				{
					method: "post",
					mode: "no-cors",
					headers: {
						Accept: "application/json",
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						key1: "myusername",
						name: "afname",
					}),
				}
			);
			console.log("Result" + result);
		} catch (e) {
			console.log(e);
		}
	}
	render() {
		return (
			<div>
				<Button onClick={() => this.postData()}>asfaf</Button>
			</div>
		);
	}
}
