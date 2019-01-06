import AWS from 'aws-sdk'
import config from 'config'
import { runInNewContext } from 'vm';
import { promises } from 'fs';
import { privateEncrypt } from 'crypto';
import jwt from 'jsonwebtoken'
import jwkToPem from 'jwk-to-pem'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

export default() => (req,res,next) => {'

    //토큰 받아오기
    const access = req.body.accessToken
    //console.log(access)
    const id = req.body.idToken
    const refresh = req.body.refreshToken
    //https://github.com/awslabs/aws-support-tools/tree/master/Cognito/decode-verify-jwt 
    //jwk 만들기
    const jwk = config.jwk  
    //console.log(jwk)
    const pem = jwkToPem(jwk[0])
    const decode_token= jwt.verify(id,pem)

    //onst credentials = auth.updateLogin(id)
    //console.log(credentials)
    //if(decode_token.email == )
    console.log('-------------------------')
    console.log(decode_token)

    //time expired
    if(decode_token.auth_time > new Date()){
        console.log('good')
	if(decode_token.auth_time - new Data() < 5*60*1000){
	    //refresh token
	    cognitoUser = getCognitoUser(decode_token)	    	     
	    cognitoUser.refreshSession(refresh, (err, session) => {
		if ( err ) return res.setStatus(404)
		AWS.config.credentials = getCognitoIdentityCredentials(id)
		AWS.config.credentials.get(function(){
		    const credentials = AWS.config.credentials.data.Credentials
		    //token 어떻게 들어오는지 확인 필요
		    req.body.sessionToken = credentials.SessionToken
		    return next()
		})
	    }
	}
    }else{
        console.log('expired')
        return res.sendStatus(401)
    }
    //aud check
    if(decode_token.aud == config.poolData.ClentId){
        console.log('good')
        
    }else{
        console.log('not equal')
        return res.sendStatus(401)
    }
    //iss check
    if(decode_token.iss == 'https://cognito-idp.us-east-1.amazonaws.com/'+config.poolData.UserPoolId){
        console.log('good')
    }else{
        return res.sendStatus(401)
    }

    return next()
}


const getCognitoUser = (token) => {
    const poolData = {
	UserPoolId :config.poolData.UserPoolId,
	ClientId : config.poolDaata.ClientId
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const userData = {
	Username : token.email,
	Pool: userPool
    }
    return new AmazonCognitoIdentity.CognitoUser(userData)
}

const getCognitoIdentityCredentials = (token) => {
    const loginInfo = {};
    loginInfo[`cognito-idp.${config.pool_region}.amazonaws.com/${config.poolData.UserPoolId}`] = token
    const params = {
	IdentityPoolId: config.poolData.IdentityPoolId,
	Logins: loginInfo

    }
    return new AWS.CognitoIdentityCredentials(params)
}
