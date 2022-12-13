export interface AuthResponse {   //karşılayan kısım
  idToken : string;
  email:string;
  refreshToken : string;
  expiresIn : string;
  localId: string;
  registered? : string;
}
