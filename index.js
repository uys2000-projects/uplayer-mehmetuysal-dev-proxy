require("dotenv").config();
const { setULogger } = require("u-logger");

const express = require("express");
var cors = require("cors");

const app = express();
const port = 3000;

const axios = require("axios");
const parser = require("iptv-playlist-parser");

setULogger(true, false);

var admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key.replace(/\\n/gm, "\n"),
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
    universe_domain: process.env.universe_domain,
  }),
});

const db = getFirestore();

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.get("/get", async (req, res) => {
  const id = req.query.id;
  const url = req.query.url;
  if (!url || !id) return res.send({ success: false });
  const result = await axios.get(url);
  const playlist = parser.parse(result.data);

  const groups = [...new Set(playlist.items.map((i) => i.group.title))];
  for (let i = 0; i < groups.length; i++) {
    const item = { id: i, data: groups[i], timestamp: Date.now() };
    const docRef = db.doc(`user/${id}/group/${i}`);
    docRef.set(item);
  }

  for (let i = 0; i < playlist.items.length; i++) {
    const item = { id: i, data: playlist.items[i], timestamp: Date.now() };
    const docRef = db.doc(`user/${id}/channel/${i}`);
    docRef.set(item);
  }

  return res.send({ success: true });
});

app.listen(port, () => {
  console.clear();
  console.log(`\nApplication started: http://localhost:${port}/`);
});
