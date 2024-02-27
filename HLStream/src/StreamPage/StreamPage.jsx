import React from "react";
import styles from "./StreamPage.module.css";
import ReactPlayer from 'react-player'
const Header = () => {
  return (
    <div>
      <p>{localStorage.getItem("user")}</p>
    </div>
  );
};




const Stream = () => {
  return (
    <div>
      <ReactPlayer  width='100%' height='400px' url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
    </div>
  )
}

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
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.stream}>
        <Stream />
      </div>
      <div className={styles.listOfChannels}><ListOfChannels /></div>
    </div>
  );
};

export default StreamPage;
