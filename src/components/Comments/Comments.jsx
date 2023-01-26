import React, { useEffect, useState } from "react";
import axios from 'axios'
import Comment from "../Comment/Comment";
import styles from './Comments.module.css'

export default function Comments(props) {

	const [Film_Id] = useState(props.Id)
	const [follows, setFollows] = useState([]);

	useEffect(() => {
		const configuration = {
			method: "get",
			url: `http://localhost:8080/routes/Opinia/findComments/${Film_Id}`,
		};
		axios(configuration).then((res) => {
			setFollows(res.data)
		});
	}, [])

	return (
		<div>
			{follows.length !== 0 ?
				<div className={styles.card_list}>
					{follows.map((data) => (
						<Comment
							Key={data}
							User={data.Login}
							Comment={data.Komentarz}
							Rating={data.Ocena}
						/>
					))}
				</div> :
				<h3 style={{ marginTop: "1vh" }}>No one has commented yet</h3>
			}
		</div>
	)
}
