import config from 'config';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
import request from 'request';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken'

const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const userPool = new AmazonCognitoIdentity.CognitoUserPool(config.poolData);

export const register = async ctx => {
    try{
	const attributeList = [];
	//이후 어떤 값을 더받아야하는지 얘기후 추가
	attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:'email',Value:ctx.body.email}));
	userPool.signUp(ctx.body.id,ctx.body.pw,attributeList,null,function(err,result){
	    if(err){
		console.log(err);
		return;
	    }
	    console.log(result);
	    //let cognitoUser = result.user;
	});
    }catch(err){
	console.log(err);
    }
}

export const login = async ctx => {
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
	Username: ctx.body.id,
	Password: ctx.body.pw
    });

    const userData = {
	Username: ctx.body.id,
	Pool: userPool

    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
	onSuccess: function(result){
	    console.log('access token : ' + result.getAccessToken().getJwtToken());
	    console.log('id token : ' + result.getIdToken().getJwtToken());
	    console.log('Refresh token : ' + result.getRefreshToken().getToken());
	},
	onFailure: function(err){
	    console.log(err);
	}
    });
}
