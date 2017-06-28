import request from "superagent";
import * as types from "../constants/";
import config from '../../../server/config/serverConfig';

export const reqStreams = (game) => {

  const promise = new Promise((resolve, reject) => {
    request
      .get(`${config.URL_ROOT}/streams?limit=60&offset=0&game=${game}&broadcaster_language=en`)
      .set({ Accept: 'application/vnd.twitchtv.v5+json', 'Client-ID': `${config.CLIENT_ID}` })
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body.streams);
        }
      });
  });

  return {
    type:    types.RECEIVE_STREAMS,
    payload: promise
  };

};

export const reqOneStream = (name) => {

  const promise = new Promise((resolve, reject) => {
    request
      .get(`${config.URL_ROOT}/streams?channel=${name}&limit=30`)
      .set({ Accept: 'application/vnd.twitchtv.v5+json', 'Client-ID': `${config.CLIENT_ID}` })
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });

  });

  return {
    type:    types.RECEIVE_STREAM,
    payload: promise
  };

};

export const addStreamToFavorite = (stream) => {

  let streamFavorites = JSON.parse(localStorage.getItem('streamFavorites'));

  if (streamFavorites) {
    streamFavorites.push(stream);
  } else {
    streamFavorites = [ stream ];
  }

  localStorage.setItem('streamFavorites', JSON.stringify(streamFavorites));

  return {
    type: types.ADD_STREAM_TO_FAVORITE,
          stream
  };

};

export const removeStreamToFavorite = (streamId) => {

  let streamFavorites = JSON.parse(localStorage.getItem('streamFavorites'));

  if (streamFavorites) {
    streamFavorites = streamFavorites.filter((streamFavorites) => streamFavorites._id !== streamId);
    localStorage.setItem('streamFavorites', JSON.stringify(streamFavorites));
  }

  return {
    type: types.REMOVE_STREAM_TO_FAVORITE,
          streamId
  };

};
