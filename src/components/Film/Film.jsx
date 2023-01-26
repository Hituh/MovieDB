import React, { useState } from "react";
import styles from "./Film.module.css";
import { useNavigate } from "react-router-dom";
import FilmDetails from "../FilmDetails/FilmDetails";

export default function FilmItem(props) {
	const [showChild, setShowChild] = useState(false)

	const openChild = () => {
		setShowChild(true)
	}

	const closeChild = () => {
		setShowChild(false)
	}

	return (
		<div>
			{showChild ?
				<FilmDetails Id={props.Id} Picture={props.Picture} Title={props.Title} ReleaseDate={props.ReleaseDate} Length={props.Length} Language={props.Language} Description={props.Description} onClose={closeChild} /> :
				<div className={styles.card}>
					<div className={styles.card.img}>
						<img src={props.Picture} alt={""} />
					</div>
					<div className={styles.card.title}>
						<h3>{props.Title}</h3>
					</div>
					<p>Release date: {props.ReleaseDate}</p>
					<p>Movie length: {props.Length} minutes</p>
					<button className={styles.filmItem} onClick={() => openChild()}>Details</button>
				</div>
			}

		</div >
	);
};
