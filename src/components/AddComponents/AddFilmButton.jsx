import React, { useState } from 'react';
import AddFilm from '../AddComponents/AddFilm';
import styles from "./AddFilmButton.module.css"

export default function AddFilmButton() {
    var user = JSON.parse(localStorage.getItem("userInfo"))
    var permsCheck = false
    const [isShown, setIsShown] = useState(false);

    if (user !== null && (user.TypKonta === 'Moderator' || user.TypKonta === 'Administrator')) permsCheck = true
    else permsCheck = false

    const handleAdd = () => {
        setIsShown(current => !current);
    }

    return (
        <div>
            {permsCheck === true &&
                <div >
                    <button className={styles.addButton} onClick={() => handleAdd()}>Add film</button>
                    {isShown &&
                        <AddFilm></AddFilm>
                    }
                </div>
            }
        </div>
    )
}