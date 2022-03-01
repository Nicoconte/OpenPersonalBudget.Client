export interface IAuthenticationResponse {
    success : boolean,
    message : string,
    accessToken : string
}

export interface IAuthenticationRequest {
    username : string,
    password : string
}