import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/typeorm/entities/user.entity";
import { UserDetails } from "src/utils/types";
import { Repository } from "typeorm";

@Injectable()
export class authService {

  constructor(@InjectRepository(User) private readonly userRepository : Repository<User>){}



  async validateUser(details : UserDetails){
  
    console.log('Auth Service');
    // console.log(details);
    const user =  await this.userRepository.findOneBy({email : details.email})
    if(user) {
      return user;
    }
    else{
      console.log('User not found.. Creating...');
      const newUser =  this.userRepository.create(details);
      return this.userRepository.save(newUser);
    }

  }

  async findUser(id : number){
    const user = await this.userRepository.findOneBy({id : id})
    return user;
  }
  
}