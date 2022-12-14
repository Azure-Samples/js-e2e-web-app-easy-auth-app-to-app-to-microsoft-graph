import { HTTPResponseError } from './error.js';
import { sortJson } from './sortJson.js';
import "isomorphic-fetch";

export const getRemoteProfile = async (remoteUrl, accessToken) => {

    try {

        if (!remoteUrl || !accessToken) {
            console.log(`!remoteUrl || !accessToken`);
            return {
                error: 'Client: No remote URL or access token found'
            };
        }

        // Get remote profile
        const response = await fetch(remoteUrl, {
            cache: "no-store", // no caching -- for demo purposes only
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        console.log(response);

        // Check response status
        if (response.ok) {

            // Get api response including profile
            const apiResponse = await response.json();
            console.log(apiResponse);

            // Data for rendered view
            return {
                error: {},
                profile: sortJson(apiResponse.profile),
                headers: sortJson(apiResponse.headers),
                env: sortJson(apiResponse.env),
                bearerToken: apiResponse.bearerToken,
            };
        } else {
            
            const textError = await response.text();
            console.log(`api Fetch error text = ${textError}`);
            
            return {
                error: {
                    error: new HTTPResponseError(response),
                    message: `api response not ok ${response.statusCode}`, 
                    type: "getRemoteProfile - api response",

                }
            }
        }
    } catch (error) {
        return {
            error: {
                error: new HTTPResponseError(error),
                message: error.message,
                type: "getRemoteProfile - catch",
            }
        }
    }
}
