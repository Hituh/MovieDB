import React, { useState } from "react"
import ChangeActor from "../EditComponents/EditActor";
import DeleteActor from "../DeleteComponents/DeleteActor";
import styles from "./Actor.module.css"
export default function Actor (props) {

  const [isShown1, setIsShown1] = useState(false);
  const [isShown2, setIsShown2] = useState(false);
  var userInfo = JSON.parse(localStorage.getItem('userInfo'));
  var check = false
  if (userInfo !== null && (userInfo.TypKonta === 'Moderator' || userInfo.TypKonta === 'Administrator')) check = true
  else check = false
  const handleAdd1 = () => {
    setIsShown1(current => !current);
  }
  const handleAdd2 = () => {
    setIsShown2(current => !current);
  }

  return (
    <div className = {styles.card}>
      <div className={styles.card.img}>
        <img src={props.Picture} alt="profil" />
      </div>
      <div className={styles.card.title}>
        <h3>{props.Name}</h3>
        <h3>{props.Surname}</h3>
      </div>
      <div className={styles.card.image}>
        <div class="columnleft">
          <p>Data Urodzenia: {props.Birthday}</p>
        </div>
        <div class="columnright">
          <div class="Length">
            <p>
              Kraj pochodzenia: {props.Country}
            </p>
          </div>
        </div>
      </div>
      {check === true &&
        <div>
          <button className={styles.filmItem} onClick={() => handleAdd1()}>Edytuj Osobę</button>
          {isShown1 &&
            <div>
              <ChangeActor  
              Id={props.Id}
               Name={props.Name}
               Surname={props.Surname}
               Birthday={props.Birthday}
               Country={props.Country}
               Picture={props.Picture} />
            </div>
          }
        </div>
      }
      {check === true &&
        <div>
          <button className={styles.filmItem} onClick={() => handleAdd2()}>Usuń Osobę</button>
          {isShown2 &&
            <div >
              <DeleteActor 
              Id={props.Id}/>
            </div>
          }
        </div>
      }

    </div>
  );
};