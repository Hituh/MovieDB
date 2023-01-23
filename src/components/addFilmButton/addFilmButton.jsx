import React, { useState } from 'react';
import AddFilmItem from '../addFilmItem/addFilmItem';
import styles from "./addFilmButton.module.css"

function AddFilmButton() {
    var user = JSON.parse(localStorage.getItem("userInfo"))
    var check = false

    if (user !== null && (user.TypKonta === 'Moderator' || user.TypKonta === 'Administrator')) check = true
    else check = false

    const [isShown, setIsShown] = useState(false);
    const handleAdd = () => {
        setIsShown(current => !current);
    }

    return (
        <div>
            {check === true &&
                <div >
                    <button className={styles.addButton} onClick={() => handleAdd()}>Dodaj film</button>
                    {isShown &&
                       
                            <AddFilmItem></AddFilmItem>
                        
                    }
                </div>
            }
        </div>
    )
}


export default AddFilmButton;