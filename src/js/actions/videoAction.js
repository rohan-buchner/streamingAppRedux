import request from "superagent";
import * as types from "../constants/";
import config from '../../../server/config/serverConfig';

export const reqVideos = name => {

  const promise = new Promise((resolve, reject) => {
    request
      .get(`${config.URL_ROOT}/${name}/videos`)
      .set({ Accept: 'application/vnd.twitchtv.v5+json', 'Client-ID': `${config.CLIENT_ID}` })
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body.videos);
        }
      });
  });

  return {
    type:    types.RECEIVE_VIDEOS_FROM_CHANNEL,
    payload: promise
  };

};
