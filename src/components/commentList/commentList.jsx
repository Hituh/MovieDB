import React, { Component, useEffect, useState } from "react";
import axios from 'axios'
import CommentItem from "../commentItem/commentItem";
import styles from './commentList.module.css'
function CommentList() {
	var retrievedObject = JSON.parse(localStorage.getItem('filmTitle'));
	var Film_Id = retrievedObject.Id
	const [observed, setObserved] = useState([]);

	useEffect(() => {
		console.log("Sent Axios")
		const configuration = {
			method: "get",
			url: `http://localhost:8080/routes/Opinia/findComments/${Film_Id}`,

		};

		axios(configuration).then((res) => {
			console.log(res.data);
			setObserved(res.data)
		});
	}, [])

	return (
		<>
			{observed.length !== 0  ?
				<div className={styles.card_list}>
					{observed.map((data) => (
						<div style={{ maxWidth: "40vh" }}>
							<CommentItem
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

export default CommentList;
