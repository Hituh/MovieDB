import React, { useState } from 'react';
import AddActor from '../AddComponents/AddActor';
import styles from './AddActorButton.module.css'

export default function AddActorButton() {
    var user = JSON.parse(localStorage.getItem("userInfo"))
    var checkPerms = false

    if (user !== null && (user.TypKonta === 'Moderator' || user.TypKonta === 'Administrator')) checkPerms = true
    else checkPerms = false

    const [isShown, setShow] = useState(false);
    const toggleShow = () => {
        setShow(current => !current);
    }

    return (
        <div>
            {checkPerms === true &&
                <div>
                    <button className={styles.addButton} onClick={() => toggleShow()}>Add actor</button>
                    {isShown &&
                        <AddActor></AddActor>
                    }
                </div>
            }
        </div>
    )
}