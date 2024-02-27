import React, { useEffect } from "react";
import styles from "./StreamPage.module.css";
import { useState } from "react";
import { getContent, getContentById } from "../api/api";

const Header = () => {
  return (
    <div className={styles.header}>
      <p className={styles.user}>{localStorage.getItem("user")}</p>
      <button className={styles.logout_btn}> LOGOUT </button>
    </div>
  );
};

const ChannelBox = ({ id, name, available, img }) => {
  const [videoData, setVideoData] = useState([]);

  const fetchVideoStream = (id) => {
    const fetchStreamById = async (id) => {
      const response = await getContentById(id);
      setVideoData(response);
    };
    fetchStreamById(id);

    console.log(videoData);
  };
  return (
    <div
      disabled={available}
      key={id}
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
        margin: "10px",
        textAlign: "center",
        cursor: "pointer",
      }}
      onClick={() => {
        if (available) { // Provjera je li available true prije izvršavanja funkcije fetchVideoStream
          fetchVideoStream(id);
        }
      }}
    >
      <img src={img} alt={name} style={{ width: "100%" }} />
      <p>{name}</p>
    </div>
  );
};

const ListOfChannels = ({ channels }) => {
  return (
    <div className={styles.videolist}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {channels.map((channel, index) => (
          <div key={index}>
            <ChannelBox {...channel} />
          </div>
        ))}
      </div>
    </div>
  );
};

const MainStream = () => {
  return (
    <div className={styles.videolist}>
      <p>Main Stream</p>
    </div>
  );
};

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
      <div className={styles.stream}>
        <MainStream />
      </div>
      <div className={styles.listOfChannels}>
        <ListOfChannels channels={channels} />
      </div>
    </div>
  );
};

export default StreamPage;
