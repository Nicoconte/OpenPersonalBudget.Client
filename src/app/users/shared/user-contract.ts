export interface IUserRegistrationRequest {
    username : string,
    email : string,
    password : string
}

export interface IUserRegistrationResponse {
    success : boolean,
    message : string
}