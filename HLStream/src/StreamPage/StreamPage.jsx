import React from "react";
import styles from "./StreamPage.module.css"



const Header = () =>  {





  return(
    <div>
        <p>{localStorage.getItem("user")}</p>

    </div>
  )
}

const StreamPage = () => {


  

  return (
    <div className={styles.layout}>
      <div className={styles.header}>

        <Header/>
      </div>
      <div className={styles.stream} >stream</div>
      <div className={styles.listOfChannels} >list of channels</div>
    </div>
  );
};

export default StreamPage;
