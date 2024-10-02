import { getDatabase, ref, set } from "firebase/database";
import app from "../config/firebase.config";

const logOutFirebase = async (username) => {
   
        const db = getDatabase(app);
        const newDocRef = ref(db, "loginUser/" + username) ;
           set(newDocRef, { active: false}).then( () => {
              localStorage.clear()
              window.location.reload();
             })
            .catch((error) => {
               console.log(error);
            }) 
       
   }

export default logOutFirebase;