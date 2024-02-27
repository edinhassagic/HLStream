import React, { useEffect, useState } from "react";
import styles from "./StreamPage.module.css";
import { getContent } from "../api/api";

const Header = () => {
  return (
    <div>
      <p>{localStorage.getItem("user")}</p>
    </div>
  );
};

const StreamPage = () => {

const[channels, setChannels] = useState([])

useEffect(()=>{
  if (localStorage.getItem("token")) {
    const fetchData = async () => {
      try {
        const response = await getContent();
        setChannels(response);
        console.log(response)
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }
}, [])


  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.stream}>stream</div>
      <div className={styles.listOfChannels}>list of channels</div>
    </div>
  );
};

export default StreamPage;
