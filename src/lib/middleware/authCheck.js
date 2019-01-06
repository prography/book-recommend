import config from 'config'
import { runInNewContext } from 'vm';
import { promises } from 'fs';
import { privateEncrypt } from 'crypto';
import jwt from 'jsonwebtoken'
import jwkToPem from 'jwk-to-pem'
//import * as auth from '../../api/routes/auth/auth.ctrl'

export default() => (req,res,next) => {

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
