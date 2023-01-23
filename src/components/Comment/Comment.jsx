import React from "react"
import styles from "./Comment.module.css"

export default function Film (props) {
  return (
    <div className={styles.card}>
      <div className={styles.card.title}>
        <h3>{props.User}</h3>
      </div>
      <div className={styles.card.title}>
        <p>{props.Comment}</p>
      </div>
      <div className={styles.card.title}>
        {[...Array(props.Rating)].map((_, i) => (
          <span key={i} role="img" aria-label="star" style={{marginLeft:"1vh", marginBottom:"1vh"}}>
            ⭐
          </span>
        ))}
      </div>
    </div>
  );
};