import {Jwt, JwtHeader, JwtPayload} from "jsonwebtoken";

export interface AccessToken extends JwtPayload {
    "sub": string,
    "iss": string,
    "exp": number,
    "iat": number,
    "jti": string,
    "username": string
}

export interface AccessTokenFull extends Jwt {
    header: JwtHeader,
    payload: AccessToken,
    signature: string
}