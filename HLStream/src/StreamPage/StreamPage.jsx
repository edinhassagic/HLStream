import React, { useEffect, useState } from "react";
import styles from "./StreamPage.module.css";
import { getContent, getContentById } from "../api/api";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import Pagination from "./Pagination";
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
      style={{ cursor: available ? "pointer" : "not-allowed" }}
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
  const [channelArray, setChannelArray] = useState(channels);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(3);

  const [indexOfLastRecord, setIndexOfLastRecord] = useState(
    currentPage * recordsPerPage
  );
  const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(
    indexOfLastRecord - recordsPerPage
  );

  const [currentRecords, setCurrentRecords] = useState(
    channelArray.slice(indexOfFirstRecord, indexOfLastRecord)
  );
  const [nPages, setNPages] = useState(
    Math.ceil(channelArray.length / recordsPerPage)
  );

    
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setRecordsPerPage(2);
    } 
    else if ( window.innerWidth < 980){
      setRecordsPerPage(3); 
    } else if ( window.innerWidth < 1250){
      setRecordsPerPage(4); 
    } else if ( window.innerWidth < 1450){
      setRecordsPerPage(5); 
    } else {
      setRecordsPerPage(6)
    }
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);


  const resetPagination = () => {
    setCurrentPage(1);
  };
  useEffect(()=>{
    resetPagination()
   setCurrentRecords( channelArray.slice(indexOfFirstRecord, indexOfLastRecord))
    console.log(currentRecords)}
  
  ,[])
  useEffect(() => {

    setCurrentRecords(
      channelArray.slice(indexOfFirstRecord, indexOfLastRecord)
    );

    setNPages(Math.ceil(channelArray.length / recordsPerPage));
  }, [setCurrentPage, indexOfFirstRecord, indexOfLastRecord, recordsPerPage]);

  useEffect(() => {
    changeNumbers();
  }, [currentPage, currentRecords]);



  const changeNumbers = async () => {
    const newIndexOfLastRecord = currentPage * recordsPerPage;

    setIndexOfFirstRecord(newIndexOfLastRecord - recordsPerPage);

    setIndexOfLastRecord(newIndexOfLastRecord);
  };

  return (
    <div className={styles.videolist}>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {currentRecords.map((channel) => (
          <div key={channel.id}>
            <ChannelBox {...channel} onSelectChannel={onSelectChannel} />
          </div>
        ))}
      </div>

      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
const MainStream = ({ channelUrl, name }) => {
  return (
    <div>
      {channelUrl && (
        <>
          <p className={styles.channel_name}>{name}</p>
          <ReactPlayer
            width="100%"
            playing={true}
            controls={true}
            url={channelUrl}
            muted={true}
          />
        </>
      )}
    </div>
  );
};

const StreamPage = () => {
  const [channels, setChannels] = useState([]);
  const [selectedChannelUrl, setSelectedChannelUrl] = useState("");
  const [selectedChannelName, setSelectedChannelName] = useState("");

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
      setSelectedChannelName(response.name);
    } catch (error) {
      console.error("Error fetching video stream:", error.message);
    }
  };

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.stream}>
        <MainStream channelUrl={selectedChannelUrl} name={selectedChannelName} />
      </div>
      <div className={styles.listOfChannels}>
        { channels.length > 0 && <ListOfChannels
          channels={channels}
          onSelectChannel={fetchVideoStream}
        />}
      </div>
    </div>
  );
};

export default StreamPage;
