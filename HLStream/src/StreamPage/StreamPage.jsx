import React, { useEffect } from "react";
import styles from "./StreamPage.module.css";
import { useState } from "react";
import { getContent } from "../api/api";
const Header = () => {
  return (
    <div className={styles.header}>
      <p className={styles.user}>{localStorage.getItem("user")}</p>
      <button className={styles.logout_btn}> LOGOUT </button>
    </div>
  );
};

const ListOfChannels = () => {
  return (
    <div className={styles.videolist}>
      <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
      <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
      <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
    </div>
  )
}


const StreamPage = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const fetchData = async () => {
        try {
          const response = await getContent();
          setChannels(response);
          console.log(response);
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };

      fetchData();
    }
  }, []);


  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.stream}>stream</div>
      <div className={styles.listOfChannels}>list of channels</div>
    </div>
  );
};

export default StreamPage;
