const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require('cors');
const app = express();
const port = 4000;
const secret = "123456789";
app.use(cors());
const channels = [
  {
    id: 1,
    name: "channel 1",
    url: "https://lagenceducourtmetrage-brefcinema-01-eu.rakuten.wurl.tv/playlist.m3u8",
  },
  {
    id: 2,
    name: "channel 2",
    url: "https://xite-samsung-de.amagi.tv/playlist.m3u8",
  },
  {
    id: 3,
    name: "channel 3",
    url: "https://lagenceducourtmetrage-brefcinema-01-eu.rakuten.wurl.tv/playlist.m3u8",
  },
  {
    id: 4,
    name: "channel 4",
    url: "https://rakuten-spotlight-7-fr.plex.wurl.tv/playlist.m3u8",
  },
  {
    id: 5,
    name: "channel 5",
    url: "https://rakuten-tvshows-7-fr.plex.wurl.tv/playlist.m3u8",
  },
  {
    id: 6,
    name: "channel 6",
    url: "https://rakuten-thriller-7-eu.rakuten.wurl.tv/playlist.m3u8",
  },
  {
    id: 7,
    name: "channel 7",
    url: "https://zylo-screamin-rakuten.amagi.tv/hls/amagi_hls_data_rakutenAA-zylo-screamin-rakuten/CDN/master.m3u8",
  },
  {
    id: 8,
    name: "channel 8",
    url: "https://amg00711-zylo-france-zylo-emotional-rakuten-frukp.amagi.tv/hls/amagi_hls_data_rakutenAA-zylo-emotional-rakuten/CDN/master.m3u8",
  },
  {
    id: 9,
    name: "channel 9",
    url: "https://mytimemoviefrance-rakuten.amagi.tv/playlist.m3u8",
  },
  {
    id: 10,
    name: "channel 10",
    url: "https://rakuten-comedymovies-7-eu.rakuten.wurl.tv/playlist.m3u8",
  },
  {
    id: 11,
    name: "channel 11",
    url: "https://zylo-cinenanar-rakuten.amagi.tv/hls/amagi_hls_data_rakutenAA-zylo-cinenanar-rakuten/CDN/master.m3u8",
  },
  {
    id: 12,
    name: "channel 12",
    url: "https://amg01259-lemeilleurducin-universcine-rakuten-bifrz.amagi.tv/hls/amagi_hls_data_rakutenAA-universcine-rakuten/CDN/master.m3u8",
  },
  {
    id: 13,
    name: "channel 13",
    url: "https://newidco-rakutenviki-2-eu.rakuten.wurl.tv/playlist.m3u8",
  },
  {
    id: 14,
    name: "Channel 14",
    url: "https://rakuten-topfree-7-fr.plex.wurl.tv/playlist.m3u8",
  },
  {
    id: 15,
    name: "Channel 15",
    url: "https://rakuten-topfree-7-eu.rakuten.wurl.tv/playlist.m3u8",
  },
  {
    id: 16,
    name: "Channel 16",
    url: "https://rakuten-romance-7-fr.plex.wurl.tv/playlist.m3u8",
  },
  {
    id: 17,
    name: "Channel 17",
    url: "https://rakuten-romance-7-eu.rakuten.wurl.tv/playlist.m3u8",
  },
  {
    id: 18,
    name: "Channel 18",
    url: "https://gustotv-gustotv-2-eu.rakuten.wurl.tv/playlist.m3u8",
  },
  {
    id: 19,
    name: "Channel 19",
    url: "https://rakuten-films-francais-1-eu.rakuten.wurl.tv/playlist.m3u8",
  },
  {
    id: 20,
    name: "Channel 20",
    url: "https://rakuten-tvshows-7-eu.rakuten.wurl.tv/playlist.m3u8",
  },
  {
    id: 21,
    name: "Channel 21",
    url: "https://rakuten-actionmovies-7-fr.plex.wurl.tv/playlist.m3u8",
  },
  {
    id: 22,
    name: "Channel 22",
    url: "https://rakuten-actionmovies-7-eu.rakuten.wurl.tv/playlist.m3u8",
  },
  {
    id: 23,
    name: "Channel 23",
    url: "https://bbceu-bbcdrama-1-fr.rakuten.wurl.tv/playlist.m3u8",
  },
  {
    id: 24,
    name: "Channel 24",
    url: "https://bbceu-doctorwho-3-fr.rakuten.wurl.tv/playlist.m3u8",
  },
  {
    id: 25,
    name: "Channel 25",
    url: "https://rakuten-spotlight-7-eu.rakuten.wurl.tv/playlist.m3u8",
  },
  {
    id: 26,
    name: "Channel 26",
    url: "https://rakuten-seriescrime-7-fr.lg.wurl.tv/playlist.m3u8",
  },
  {
    id: 27,
    name: "Channel 27",
    url: "https://rakuten-guardian-1-fr.lg.wurl.tv/playlist.m3u8",
  },
  {
    id: 28,
    name: "Channel 28",
    url: "https://rakuten-comedymovies-7-fr.plex.wurl.tv/playlist.m3u8",
  },
  {
    id: 29,
    name: "Channel 29",
    url: "https://spi-filmstream-1-eu.rakuten.wurl.tv/playlist.m3u8",
  },
  {
    id: 30,
    name: "Channel 30",
    url: "https://d39g1vxj2ef6in.cloudfront.net/v1/master/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/channel-hls/v2/77dc314fd75541ff/9991729/master.m3u8?ads.xumo_channelId=9991729",
  },
  {
    id: 31,
    name: "Channel 31",
    url: "https://d39g1vxj2ef6in.cloudfront.net/v1/master/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/channel-hls/v2/56f5b5ceafba4a8b/9991728/master.m3u8?ads.xumo_channelId=9991728",
  },
];

const users = [
  {
    id: 1,
    name: "user 1",
    username: "user1",
    password: "user1",
    channels: [
      1, 3, 4, 5, 8, 9, 10, 15, 16, 17, 19, 20, 22, 23, 25, 26, 27, 28, 29, 30,
    ],
  },
  {
    id: 2,
    name: "user 2",
    username: "user2",
    password: "user2",
    channels: [
      1, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 21, 22, 23, 24, 25, 26, 30, 31,
    ],
  },
  {
    id: 3,
    name: "user 3",
    username: "user3",
    password: "user3",
    channels: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
  },
];



const checkAuth = async (req, res, next) => {
  if (!req?.headers?.authorization) return res.status(401).end();

  let extractedTokenFromHeader = req?.headers?.authorization || "";

  const [type, token] = extractedTokenFromHeader.split(" ");

  jwt.verify(token, secret, async (error, decoded) => {
    req.jwt = {};
    req.jwt.decoded = decoded;

    if (error) return res.status(401).end();

    req.jwt.id = decoded.id;

    next();
  });
};

app.get("/login", (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Authorization header is missing' });

  const [type, credentials] = authorization.split(" ");

  if (type !== "Basic") return res.status(401).end();

  const [username, password] = Buffer.from(credentials, "base64")
    .toString()
    .split(":");

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) return res.status(401).end();

  jwt.sign({ id: user.id }, secret, { expiresIn: 60 * 60 }, (error, token) => {
    if (error) return res.status(401).end();

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        channels: user.channels,
      },
    });
  });
});

app.get("/channels", checkAuth, (req, res) => {
  const userId = req.jwt.id;

  const user = users.find((user) => user.id === userId);

  if (!user) return res.status(401).end();

  const userChannels = user.channels;

  const channelList = channels.map(({ id, name }) => ({
    id,
    name,
    available: userChannels.includes(id),
    img: `https://picsum.photos/200`,
  }));

  return res.status(200).json({ channels: channelList });
});

app.get("/channels/:channelId", checkAuth, (req, res) => {
  const { channelId } = req.params;
  const userId = req.jwt.id;

  const user = users.find((user) => user.id === userId);

  if (!user) return res.status(401).end();

  const channel = channels.find(
    (channel) => channel.id === parseInt(channelId)
  );

  if (!channel) return res.status(404).end();

  const userChannels = user.channels;

  if (!userChannels.includes(parseInt(channelId))) return res.status(403).end();

  return res.status(200).json(channel);
});

app.use((req, res) => {
  return res.status(404).end();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
