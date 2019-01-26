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
    console.log('middleware')
    console.log(req)
    //토큰 받아오기
    // const id = req.body.idToken
    // const access = req.body.accessToken
    //const refresh = req.body.refreshToken
    const access = new CognitoAccessToken({AccessToken: req.headers.accesstoken});
    const id = new CognitoIdToken({IdToken: req.headers.idtoken});
    const refresh = new CognitoRefreshToken({RefreshToken: req.headers.refreshtoken});
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
        const jwk = JSON.parse(body)
        const pem = jwkToPem(jwk.keys[0])
        try{
            const decode_token= jwt.verify(id.jwtToken,pem)
            const cognitoUser = getCognitoUser(decode_token);

            if(decode_token.exp - parseInt((new Date).getTime()/1000) < 5*60){
                cognitoUser.refreshSession(refresh, (err, session) => {
                    console.log(err)
                    if (err) return res.status(401).json({ 'error' : err}) 
                    const tokens = getTokens(session);

                    AWS.config.credentials = getCognitoIdentityCredentials(tokens);
                    AWS.config.credentials.get(function() {
                        const credentials = AWS.config.credentials.data.Credentials;
                    // req.session.AWSCredentials = getAWSCredentials(credentials);
                    });
                });
            }

            //aud check
            if(decode_token.aud == process.env.CLIENT_ID){
                console.log('aud good')
            }else{
                console.log('not equal')
                return res.status(401).json({'error': 'aud not equal'})
            }

            //iss check
            if(decode_token.iss == 'https://cognito-idp.ap-northeast-2.amazonaws.com/'+process.env.USER_POOL_ID){
                console.log('iss good')
            }else{
                return res.status(401).json({'error': 'iss not equal'})
            }

            return next()

        }catch(err){
            return res.status(401).json({'error':err})
        }

    })
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
        console.log(`cognito-idp.${process.env.POOL_REGION}.amazonaws.com/${process.env.USER_POOL_ID}`)
        loginInfo[`cognito-idp.${process.env.POOL_REGION}.amazonaws.com/${process.env.USER_POOL_ID}`] = token.idToken;

        const params = {
            IdentityPoolId: process.env.IDENTITY_POOL_ID,
            Logins: loginInfo
        };
        return new AWS.CognitoIdentityCredentials(params);
    }
    catch(err){
        throw err
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
