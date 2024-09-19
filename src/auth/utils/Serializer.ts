import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/typeorm/entities/user.entity";
import { authService } from "../auth.service";
import { Inject } from "@nestjs/common";

export class SessionSerializer extends PassportSerializer {

constructor(
    @Inject('AUTH_SERVICE') private readonly authService : authService
) {
super();
}


    serializeUser(user: User, done: (err: Error, user: any) => void) {
        console.log("Serializing User...");
        
        done(null, user);
    }
    deserializeUser(payload: any, done: (err: Error, payload: any) => void) {
        console.log("Deserializing User...");
        
    const user = this.authService.findUser(payload.id)
    return user ? done(null, user) : done(null, null)
    }
    }

    
