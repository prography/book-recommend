import AWS, { CognitoIdentity } from 'aws-sdk'
import { runInNewContext } from 'vm';
import { promises } from 'fs';
import { privateEncrypt } from 'crypto';
import jwt from 'jsonwebtoken'
import jwkToPem from 'jwk-to-pem'
import fetch from 'node-fetch'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { decode } from 'punycode';
import request from 'request'
const CognitoIdToken = require('amazon-cognito-identity-js-node').CognitoIdToken;
const CognitoAccessToken = require('amazon-cognito-identity-js-node').CognitoAccessToken;
const CognitoRefreshToken = require('amazon-cognito-identity-js-node').CognitoRefreshToken;

export default() => (req,res,next) => {
    //토큰 받아오기
    // const id = req.body.idToken
    // const access = req.body.accessToken
    //const refresh = req.body.refreshToken
    const access = new CognitoAccessToken({AccessToken: req.body.accessToken});
    const id = new CognitoIdToken({IdToken: req.body.idToken});
    const refresh = new CognitoRefreshToken({RefreshToken: req.body.refreshToken});
    
    // console.log(refresh)
    const sessionData = {
        IdToken: id,
        AccessToken: access,
        RefreshToken: refresh
    };
    
    const POOL_DATA = {
        "UserPoolId": process.env.USER_POOL_ID,
        "ClientId": process.env.CLIENT_ID,
        "IdentityPoolId": process.env.IDENTITY_POOL_ID
    }
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(POOL_DATA);

    //https://github.com/awslabs/aws-support-tools/tree/master/Cognito/decode-verify-jwt 
    //jwk 만들기
    request(`https://cognito-idp.${process.env.POOL_REGION}.amazonaws.com/${process.env.USER_POOL_ID}/.well-known/jwks.json`, (error, response, body) => {
        const jwk = JSON.stringify(body) 
    })
    //console.log(jwk)
    const pem = jwkToPem(jwk[0])
    console.log(id.jwtToken)
    const decode_token= jwt.verify(id.jwtToken,pem)

    const cognitoUser = getCognitoUser(decode_token);
    // const cognitoUser = userPool.getCurrentUser();
    console.log(decode_token)

    let cachedSession = sessionData
    cognitoUser.getSession(function(err, result){
        result.Session = sessionData
        cachedSession = result
    })
    //const credentials = auth.authorizeUser(id)
    //console.log(credentials)
    // console.log(decode_token)
    if (!cachedSession.isValid()) {

        return res.sendStatus(401)
    } else {
        console.log(decode_token.exp - parseInt((new Date).getTime()/1000))
        if(decode_token.exp - parseInt((new Date).getTime()/1000) < 5*60){
            //cognitoUser = getCognitoUser(req);
            cognitoUser.refreshSession(refresh, (err, session) => {
                if (err) throw err;
                const tokens = getTokens(session);
                console.log(tokens)

                AWS.config.credentials = getCognitoIdentityCredentials(tokens);
                AWS.config.credentials.get(function() {
                    console.log(AWS.config.credentials)
                    const credentials = AWS.config.credentials.data.Credentials;
                    console.log(getAWSCredentials(credentials))

                // req.session.AWSCredentials = getAWSCredentials(credentials);

                
                });
            });
        }
    }

    //aud check
    if(decode_token.aud == process.env.CLIENT_ID){
        console.log('good')
    }else{
        console.log('not equal')
        return res.sendStatus(401)
    }

    //iss check
    if(decode_token.iss == 'https://cognito-idp.ap-northeast-2.amazonaws.com/'+process.env.user){
        console.log('good')
    }else{
        return res.sendStatus(401)
    }

    return next()
}

const getTokens = function(session) {
    return {
        accessToken: session.getAccessToken().getJwtToken(),
        idToken: session.getIdToken().getJwtToken(),
        refreshToken: session.getRefreshToken().getToken()
    };
  };

const getCognitoUser = (token) => {
    const poolData = {
        UserPoolId :process.env.USER_POOL_ID,
        ClientId : process.env.CLIENT_ID
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const userData = {
        Username : token['cognito:username'],
        Pool: userPool
    }
    //console.log(userData)
    return new AmazonCognitoIdentity.CognitoUser(userData)
}

const getCognitoIdentityCredentials = (token) => {
    try{
        const loginInfo = {};
        loginInfo[`cognito-idp.${process.env.POOL_REGION}.amazonaws.com/${process.env.USER_POOL_ID}`] = token.idToken;

        const params = {
            IdentityPoolId: process.env.IDENTITY_POOL_ID,
            Logins: loginInfo
        };
        return new AWS.CognitoIdentityCredentials(params);
    }
    catch(err){
        console.log(err)
    }
}

const getAWSCredentials = (credentials) => {
    return {
      accessKey: credentials.AccessKeyId,
      secretKey: credentials.SecretKey,
      sessionToken: credentials.SessionToken,
      region: process.env.POOL_REGION,
      invokeUrl: 'https://' +  '82uym5oh19.execute-api.ap-northeast-2.amazonaws.com/dev/'
    };
  };
