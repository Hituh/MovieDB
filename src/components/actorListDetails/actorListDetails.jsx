import axios from "axios";
import React, { Component } from "react";

class ActorListDetails extends Component {
	constructor() {
		super();
		this.state = {
			nameList: [{}],
		};
	}
	componentDidMount() {
		const test = JSON.parse(localStorage.getItem("filmTitle"));
		const configuration = {
			method: "get",
			url: `http://localhost:8080/routes/Film/findActors/${test.Id}`,
		};

		axios(configuration).then((res) => {
			const list = [];
			for (var i = 0; i < res.data.Osoba_Id_Osobas.length; i++) {
				const newPerson = {
					Imię: res.data.Osoba_Id_Osobas[i]["Imię"],
					Nazwisko: res.data.Osoba_Id_Osobas[i]["Nazwisko"],
				};
				list.push(newPerson);
			}
			this.setState({ nameList: list });
		});
	}
	render() {
		return (
			<div>
				{this.state.nameList.length === 0 && (
                    <div>Nie dodano jeszcze aktorów do tego tytułu</div>
                )}
                {this.state.nameList.length !== 0 && (
                    <div>Lista Aktorów:
					<ul>
						{this.state.nameList.map((item) => (
							<li key={item.Imię}>
								{item.Imię} {item.Nazwisko}
							</li>
						))}
					</ul>
                    </div>
                )}
				
			</div>
		);
	}
}
export default ActorListDetails;
