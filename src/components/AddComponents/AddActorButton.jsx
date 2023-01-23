import React, { useState } from 'react';
import AddActor from '../AddComponents/AddActor';
import styles from './AddActorButton.module.css'

export default function AddActorButton() {
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
                <div>
                    <button className={styles.addButton} onClick={() => handleAdd()}>Dodaj Osobe</button>
                    {isShown &&
                        <div><AddActor></AddActor>
                        </div>
                    }
                </div>
            }
        </div>
    )

}