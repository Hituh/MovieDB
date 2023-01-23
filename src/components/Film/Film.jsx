import React from "react";
import styles from "./Film.module.css";
import { useNavigate } from "react-router-dom";

const FilmItem = (props) => {
	let history = useNavigate();
	const handleDetails = (props) => {
		localStorage.setItem("filmTitle", JSON.stringify(props));
		history("/filmDetails");
	};

	return (
		<div className={styles.card}>
			<div className={styles.card.img}>
				<img src={props.Picture} alt={""}/>
			</div>
			<div className={styles.card.title}>
				<h3>{props.Title}</h3>
			</div>
			<div className={styles.card.image}>
				<div class="columnleft">
					<p>Release date: {props.ReleaseDate}</p>
				</div>
				<div class="columnright">
					<div class="Length">
						<p>Movie length: {props.Length} minutes</p>
					</div>
				</div>
			</div>

        <button className={styles.filmItem} onClick={() => handleDetails(props)}>Details</button>

		</div>
	);
};
export default FilmItem;
