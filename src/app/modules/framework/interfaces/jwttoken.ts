export interface JwtTokenHeader {
    "alg": string,
    "type": string
}

export interface JwtTokenPayload { 
    "user_id": number,
    "username": string,
    "expire": number
}
