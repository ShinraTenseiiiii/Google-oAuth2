import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { authService } from '../auth.service';
import { log } from 'console';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

constructor(
    @Inject('AUTH_SERVICE') private readonly authService : authService
) {
    super({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ['email', 'profile'],
    })
}    


async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log("access token : "+accessToken);
    console.log("refresh token : "+refreshToken);
    console.log(profile);
    
    const user = await this.authService.validateUser({email : profile.emails[0].value , displayName : profile.displayName})
    console.log(user);
    
    return user || null;

}

}