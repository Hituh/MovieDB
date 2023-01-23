import React, { useState } from 'react';
import AddFilm from '../AddComponents/AddFilm';
import styles from "./AddFilmButton.module.css"

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
                    <button className={styles.addButton} onClick={() => handleAdd()}>Add film</button>
                    {isShown &&
                       
                            <AddFilm></AddFilm>
                        
                    }
                </div>
            }
        </div>
    )
}


export default AddFilmButton;