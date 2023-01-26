import React, { useState } from "react"
import ChangeActor from "../EditComponents/EditActor";
import DeleteActor from "../DeleteComponents/DeleteActor";
import styles from "./Actor.module.css"

export default function Actor(props) {
  const [showEditActor, setEditActor] = useState(false);
  const [showDeleteActor, setDeleteActor] = useState(false);
  var userInfo = JSON.parse(localStorage.getItem('userInfo'));
  var permsCheck = false
  if (userInfo !== null && (userInfo.TypKonta === 'Moderator' || userInfo.TypKonta === 'Administrator')) permsCheck = true
  else permsCheck = false
  const toggleEditActor = () => { setEditActor(current => !current); }
  const toggleDeleteActor = () => { setDeleteActor(current => !current); }

  return (
    <div className={styles.card}>
      <div className={styles.card.img}>
        <img src={props.Picture} alt="profil" />
      </div>
      <div className={styles.card.title}>
        <h3>{props.Name}</h3>
        <h3>{props.Surname}</h3>
      </div>
      <p>Birth date: {props.Birthday}</p>
      <p>
        Country of origin: {props.Country}
      </p>
      {permsCheck &&
        <div>
          <button className={styles.filmItem} onClick={() => toggleEditActor()}>Edit actor</button>
          {showEditActor &&
            <ChangeActor
              Id={props.Id}
              Name={props.Name}
              Surname={props.Surname}
              Birthday={props.Birthday}
              Country={props.Country}
              Picture={props.Picture} />
          }
        </div>
      }
      {permsCheck &&
        <div>
          <button className={styles.filmItem} onClick={() => toggleDeleteActor()}>Delete actor</button>
          {showDeleteActor &&
            <DeleteActor
              Id={props.Id} />
          }
        </div>
      }
    </div>
  );
};