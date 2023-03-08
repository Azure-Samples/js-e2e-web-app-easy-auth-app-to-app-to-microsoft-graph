// ./backend/src/server.js
// Express.js app server
import express from 'express';
import 'isomorphic-fetch';
import { sortJson, prettyJson } from './sortJson.js';
import { getGraphProfile } from './graph.js';

export const create = async () => {

  // Create express app
  const app = express();

  app.get('/debug', async (req, res) => {
    
    res.send(prettyJson(sortJson({
      tenantId: getTenantId(),
      headers: sortJson(req.headers),
      env: sortJson(process.env)
    })));
  })

  // <content_get_profile>
  // Get Profile and return to client
  app.get('/get-profile', async (req, res) => {

    let profile;
    let accessToken;
    let bearerToken;

    try {

      bearerToken = req.headers['Authorization'] || req.headers['authorization'];
      if (!bearerToken)  {
        return res.status(401).json({ error: 'No bearer token found' });
      }

      accessToken = bearerToken.split(' ')[1];
      if (!accessToken){
        return res.status(401).json({ error: 'No access token found' });
      } 

      profile = await getGraphProfile(accessToken);
      console.log(`profile: ${JSON.stringify(profile)}`);

      return res.status(200).json({
        profile,
        headers: req.headers,
        bearerToken,
        env: process.env,
        error: null
      });

    } catch (err) {
      console.log(`/get-profile err: ${JSON.stringify(err)}`);
      // Don't do this in production!
      // Return 200 so frontend can display it
      return res.status(200).json({
        error: {
          "profile": "error",
          "server_response": err,
          "message": err.message
        }
      });
    }
  });
  // </content_get_profile>


  app.get('*', (_, res) => {
    res.json({status: "unknown url request"});
  });

  return app;
};

