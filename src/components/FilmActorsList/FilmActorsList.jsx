import axios from "axios";
import React, { useState, useEffect } from "react";

export default function ActorListDetails(props) {
	const [Film_Id] = useState(props.Id)
	const [nameList, setNameList] = useState([])

	useEffect(() => {
		const configuration = {
			method: "get",
			url: `http://localhost:8080/routes/Film/findActors/${Film_Id}`,
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
			setNameList(list);
		});
	}, [])

	return (
		<div>
			{nameList.length === 0 && (
				<h3>There is no actors assigned to this film yet</h3>
			)}
			{nameList.length !== 0 && (
				<ul>Actors list:
					{nameList.map((item) => (
						<li key={item.Imię}>
							<p>{item.Imię} {item.Nazwisko}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}