import React from "react";
import FollowButton from "../followButton/followButton";
import styles from "./FilmItem.module.css";
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
				<img src={props.Picture} />
			</div>
			<div className={styles.card.title}>
				<h3>{props.Title}</h3>
			</div>
			<div className={styles.card.image}>
				<div class="columnleft">
					<p>Data Wydania: {props.ReleaseDate}</p>
				</div>
				<div class="columnright">
					<div class="Length">
						<p>Długość filmu: {props.Length} minut</p>
					</div>
				</div>
			</div>

        <button className={styles.filmItem} onClick={() => handleDetails(props)}>Szczegóły</button>

		</div>
	);
};
export default FilmItem;
