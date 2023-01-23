import React, {useEffect, useState } from "react";
import axios from 'axios'
import Comment from "../Comment/Comment";
import styles from './Comments.module.css'

export default function Comments() {
	var retrievedObject = JSON.parse(localStorage.getItem('filmTitle'));
	var Film_Id = retrievedObject.Id
	const [observed, setObserved] = useState([]);

	useEffect(() => {
		const configuration = {
			method: "get",
			url: `http://localhost:8080/routes/Opinia/findComments/${Film_Id}`,

		};

		axios(configuration).then((res) => {
			setObserved(res.data)
		});
	}, [])

	return (
		<>
			{observed.length !== 0  ?
				<div className={styles.card_list}>
					{observed.map((data) => (
						<div style={{ maxWidth: "40vh" }}>
							<Comment
								Key = {data}
								User={data.Login}
								Comment={data.Komentarz}
								Rating={data.Ocena}
							/>
						</div>))}
				</div> :
				<div>
					<h3>Nikt nie dodał jeszcze komentarzy</h3>
				</div>

			}
		</>
	)
}
