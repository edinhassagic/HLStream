import React from "react";
import styles from "./StreamPage.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <p className={styles.user}>{localStorage.getItem("user")}</p>
      <button className={styles.logout_btn}> LOGOUT </button>
    </div>
  );
};

const StreamPage = () => {
  return (
    <div className={styles.layout}>
      <Header/>
      <div className={styles.stream}>stream</div>
      <div className={styles.listOfChannels}>list of channels</div>
    </div>
  );
};

export default StreamPage;
