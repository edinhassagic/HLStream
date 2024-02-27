import React, { useEffect } from "react";
import styles from "./StreamPage.module.css";
import { useState } from "react";
import { getContent, getContentById } from "../api/api";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className={styles.header}>
      <p className={styles.user}>{localStorage.getItem("user")}</p>
      <button onClick={handleLogout} className={styles.logout_btn}>LOGOUT</button>
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
      className={styles.channel_container}
      disabled={available}
      key={id}
      onClick={() => {
        if (available) {
          // Provjera je li available true prije izvršavanja funkcije fetchVideoStream
          fetchVideoStream(id);
        }
      }}
    >
      <img
        className={!available ? styles.img_blured : ""}
        src={img}
        alt={name}
        style={{ width: "100%" }}
      />
      {available ? (
        <p>{name}</p>
      ) : (
        <div>
          <button> DOKUPITE {name} </button>
        </div>
      )}
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
