import fetch from "node-fetch";
import * as dotenv from "dotenv";

dotenv.config();
import express from "express";
const app = express();

const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CALLBACK_URL = "http%3A//localhost:8000/google/callback";
const GOOGLE_OAUTH_SCOPES = [

"https%3A//www.googleapis.com/auth/userinfo.email",
"https%3A//www.googleapis.com/auth/userinfo.profile",

];

const Port = 8000;

app.use(express.json());
app.get("/",async(req,res)=>{
  const state = "some_state";
  const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
  const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
  res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
  
  res.send("Sign in with Google ");
});

app.get("/google/callback",async(req,res)=>{
  res.send("Google OAuth callback URL ");
});


 
app.listen(Port,()=>{
  console.log(`Server is Running on ${Port}`)
});
