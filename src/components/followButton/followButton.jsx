import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './FollowButton.module.css'

export default function FollowButton() {
   var retrievedObject = JSON.parse(localStorage.getItem('filmTitle'));
    var dane = JSON.parse(localStorage.getItem('userInfo'));
    var Film_Id = retrievedObject.Id
    var Login = dane.Login
   var title = retrievedObject.Title
   const [observed, setObserved] = useState([]);

   useEffect(() => {
      const configuration = {
         method: "get",
         url: `http://localhost:8080/routes/Obserwuje/findObserved/${dane.Login}`,
      };

      axios(configuration).then((res) => {
         var array = []
         for (var i = 0; i < res.data.length; i++) {
            var name = res.data[i].Film["Tytuł"]
            array.push(name);
           
         }
         setObserved(array)
      });
   }, [])

   const handleSubmit = (e) => {
      // prevent the form from refreshing the whole page
      e.preventDefault();

      // set configurations
      const configuration = {
          method: "post",
          url: "http://localhost:8080/routes/Obserwuje",
          data: {
              Film_Id,
              Login,
          },
      };
      axios(configuration)
          .then(() => {
            window.location.reload(false);
          })
          .catch((error) => {
              error = new Error();

          });
  }



   return (
      <>
         {observed.includes(title) ?
            <div>
               <button className={styles.following_btn} type="button">Following</button>
            </div> :

            <div className={styles.following}>               
               <button className={styles.follow_btn} type="button" onClick={(e) => handleSubmit(e)} >Follow</button>
            </div>}
      </>
   )
}