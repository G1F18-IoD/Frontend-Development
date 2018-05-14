export interface JwtTokenHeader {
    "alg": string,
    "type": string
}

export interface JwtTokenPayload { 
    "primarysid": number,
    "unique_name": string,
    "exp": number
}
