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
	try {
		const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
			Username: ctx.body.id,
			Password: ctx.body.pw
		});
		
		const userData = {
			Username: ctx.body.id,
			Pool: userPool
		};
		const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
		console.log(authenticationDetails)
		cognitoUser.authenticateUser(authenticationDetails, {
			
			onSuccess: function(result){
				console.log(result)
				console.log('access token : ' + result.getAccessToken().getJwtToken());
				console.log('id token : ' + result.getIdToken().getJwtToken());
				console.log('Refresh token : ' + result.getRefreshToken().getToken());
				updateLogin(result.getIdToken().getJwtToken());
				success(result.getAccessToken().getJwtToken());	
			},
			onFailure: function(err){
				console.log(err);
			}

		});
	} catch (error) {
		console.log(error);
	}
}

const updateLogin = async token => {
	try{
		const credentials = {};
		const url = 'cognito-idp.' + config.pool_region + '.amazonaws.com/' + config.poolData.UserPoolId;
		credentials['Logins'] = {};
		credentials['Logins'][url] = token;
		credentials['IdentityPoolId'] = config.IdentityPoolId;
		AWS.config.update({
			credentials: new AWS.CognitoIdentityCredentials(credentials)
			
		});
	}catch (error){
		console.log(error)
	}
}

const success = async token => {
	const cognitoUser = userPool.getCurrentUser();
		console.log(cognitoUser)

		if (cognitoUser != null) {
			cognitoUser.getSession(function(err, result) {
			   if (result) {
				  console.log('You are now logged in.');
		 
				  // Add the User's Id Token to the Cognito credentials login map.
				  const loginUrl = 'cognito-idp.'+ config.pool_region +'.amazonaws.com/'+ config.poolData.UserPoolId
				  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
					 IdentityPoolId: config.poolData.IdentityPoolId,
					 Logins: {
						loginUrl : result.getIdToken().getJwtToken()
					 }
				  });
				  console.log(AWS.config.credentials)
			   }
			});
		 }
}

export const update = async ctx => {
	try {
	

		const attributeList = [];
		attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
			Name: "email",
			Value: ctx.body.email
		}));

		const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
			Username: ctx.body.id,
			Password: ctx.body.pw
		});

		const userData = {
			Username: ctx.body.id,
			Pool: userPool
		};

		//const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
		cognitoUser.updateAttributes(attributeList,(err,result)=>{
			if(err){
				console.log(err);
			}else{
				console.log(result);
			}
		})
	} catch (error) {
		console.log(error);
	}
	
}