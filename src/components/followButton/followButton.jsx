import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './FollowButton.module.css'

export default function FollowButton(props) {
   var Login = JSON.parse(localStorage.getItem('userInfo')).Login;
   const [observed, setObserved] = useState([]);
   const [title] = useState(props.Title)
   const [Film_Id] = useState(props.Id)

   useEffect(() => {
      const configuration = {
         method: "get",
         url: `http://localhost:8080/routes/Obserwuje/findObserved/${Login}`,
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
            <button className={styles.following_btn} type="button">Following</button>
            : <button className={styles.follow_btn} type="button" onClick={(e) => handleSubmit(e)} >Follow</button>
         }
      </>
   )
}