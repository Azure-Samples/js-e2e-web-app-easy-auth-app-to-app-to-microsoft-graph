---
page_type: sample
name: Authenticate and authorize users app -> app -> graph
description: This tutorial shows how to secure two App Services (frontend and backend), passing user auth from the frontend app to the backend, then access a downstream Azure service with the user's credentials.  
languages:
- javascript
products:
- azure-app-service
---

# Authenticate and authorize users end-to-end in Azure App Service with JavaScript and Microsoft Graph

The tutorial shows how to securely pass a frontend app user's credentials to a backend app, then use the credentials to access a downstream Azure service. This specific example is using Microsoft Graph, as an example. The mechanism of exchanging a token for a new token with a downstream service's scope can be used with other Azure services.

## Authentication and token scopes

This sample uses 2 Azure App Service apps to demonstrate:

* Frontend - App Service secured with Active Directory (AD app 1) authentication provider (Easy auth) which authenticates user
    * Get an access token from the injected HTTP header by easy auth. 
    * When the user requests their profile from the API server, the client app passes the user's access token as the bearer token in the request.
* Backend - App Service also secured with Active Directory (AD app 2) authentication provider (Easy auth) which requests API requests if they aren't valid for the API app. 
    * Get's user's token for header `Authentication: bearerToken xyx`
    * Exchanges token for new token with Microsoft Graph scope
    * Uses token to get user's profile from Microsoft Graph

## Read the tutorial

Coming soon - the tutorial...
