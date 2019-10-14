import { Service, Methods, Response, Body, NotFoundError, UnauthorizedError } from "threerest";
import { DB_NAME, convert } from "../app-const";
import { Injector } from "../inject/injector";
import { User } from "./user-service";
import { Response as EResponse} from "express";
import { HEADER_AUTH, BEARER_HEADER, generateToken } from "../secure/auth-jwt";
const Convert = require("threerest").Convert;


@Service.path("/login")
export default class ServiceTitles {
  User
  private collection:any;

  constructor() {
    this.collection = Injector.getRegistered(DB_NAME).collection("users");
  }

  @Methods.post("")
  add(@Body() user:User, @Response() response:EResponse) {
    let u:User&{validate: Function} = convert(user, User);
    u.validate()
    return this.collection.findOne({name: u.name})
    .then((userToLogin:User)=>{
      if (!userToLogin) throw new NotFoundError();
      if (userToLogin.password !== user.password) throw new UnauthorizedError("bad user/password");
      response.set(HEADER_AUTH, BEARER_HEADER + generateToken(userToLogin))
      response.set("Access-Control-Expose-Headers", HEADER_AUTH);
      return userToLogin;
    })
    .then((userToLogin)=>{
      return this.collection.updateOne({name: user["name"]}, {...userToLogin, lastLogin: Date.now()}).then( result => undefined);
    });

  }
}



