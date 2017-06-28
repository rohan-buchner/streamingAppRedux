import request from "superagent";
import * as types from "../constants/";
import config from '../../../server/config/serverConfig';

export const reqFeatureStreams = featured => {

  const promise = new Promise((resolve, reject) => {
    request
      .get(`${config.ROOT_URL}/streams/featured?limit=48&offset=0`)
      .set({ Accept: 'application/vnd.twitchtv.v5+json', 'Client-ID': `${config.CLIENT_ID}` })
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body.featured);
        }
      });
  });

  return {
    type: types.RECEIVE_FEATURES_STREAMS,
    payload: promise
  };

};
