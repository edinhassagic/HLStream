import React, { useEffect, useState } from "react";
import styles from "./StreamPage.module.css";
import { getContent, getContentById } from "../api/api";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
    navigate("/");
  };

  return (
    <div className={styles.header}>
      <p className={styles.user}>{localStorage.getItem("user")}</p>
      <button onClick={handleLogout} className={styles.logout_btn}>
        LOGOUT
      </button>
    </div>
  );
};

const ChannelBox = ({ id, name, available, img, onSelectChannel }) => {
  return (
    <div
      className={styles.channel_container}
      disabled={available}
      key={id}
      onClick={() => {
        if (available) {
          onSelectChannel(id);
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

const ListOfChannels = ({ channels, onSelectChannel }) => {
  return (
    <div className={styles.videolist}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {channels.map((channel) => (
          <div key={channel.id}>
            <ChannelBox {...channel} onSelectChannel={onSelectChannel} />
          </div>
        ))}
      </div>
    </div>
  );
};

const MainStream = ({ channelUrl }) => {
  return (
    <div>
      {channelUrl && (
        <>
          <p>Main Stream</p>
          <ReactPlayer
            width="100%"
            playing={true}
            controls={true}
            url={channelUrl}
          />
        </>
      )}
    </div>
  );
};

const StreamPage = () => {
  const [channels, setChannels] = useState([]);
  const [selectedChannelUrl, setSelectedChannelUrl] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const fetchData = async () => {
        try {
          const response = await getContent();
          const firstAvailableVideo = response.find((video) => video.available);
          if (firstAvailableVideo) {
            fetchVideoStream(firstAvailableVideo.id);
          }
          setChannels(response);
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };

      fetchData();
    }
  }, []);

  const fetchVideoStream = async (id) => {
    try {
      const response = await getContentById(id);
      setSelectedChannelUrl(response.url);
    } catch (error) {
      console.error("Error fetching video stream:", error.message);
    }
  };

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.stream}>
        <MainStream channelUrl={selectedChannelUrl} />
      </div>
      <div className={styles.listOfChannels}>
        <ListOfChannels
          channels={channels}
          onSelectChannel={fetchVideoStream}
        />
      </div>
    </div>
  );
};

export default StreamPage;
