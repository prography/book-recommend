import config from 'config'

export const authCheck = async ctx => {
    const token = ctx.body.token
    let section = token.split(';')
    let access = new CognitoAccessToken({ AccessToken : tokens.accessToken});
    let id = new CognitoAccessToken({ IdToken : tokens.idToken});
    let access = new CognitoAccessToken({ RefreshToken : tokens.refreshToken});
    
    const userSession = new CognitoUserSession(sessionData);
    
    // set userData
    const userData ={}

    const cognitoUser = new CognitoUser(userData)
    cognitoUser.setSignInUserSession
}
