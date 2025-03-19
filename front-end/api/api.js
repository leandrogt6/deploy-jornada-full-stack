
import axios from "axios";


//const { NODE_ENV } = process.env;
const URL =  "https://deploy-jornada-full-stack-5c0a.onrender.com/api";


const responseArtists = await axios.get(`${URL}/artists`);
const responseSongs = await axios.get(`${URL}/songs`);

export const artistArray = responseArtists.data;
export const songsArray= responseSongs.data;


//console.log(responseArtists);
