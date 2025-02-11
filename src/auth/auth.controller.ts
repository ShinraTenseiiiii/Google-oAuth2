import { Controller, Get, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./utils/Guards";

@Controller("auth")
export class AuthController {
    
    @Get("google/login")
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
        return {
            msg :"loogged in" 
        }
    }


    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    handleRedirect(){
        return {
            msg: "redirected"
        }
    }
    
}