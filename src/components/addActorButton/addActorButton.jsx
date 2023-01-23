import React, { useState } from 'react';
import AddActorItem from '../addActorItem/addActorItem';
import styles from './addActorButton.module.css'

function AddActorButton() {
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
                        <div><AddActorItem></AddActorItem>
                        </div>
                    }
                </div>
            }
        </div>
    )

}


export default AddActorButton;