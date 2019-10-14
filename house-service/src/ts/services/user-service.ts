import { Service, Methods, Params, Body, NotFoundError } from "threerest";
import { DB_NAME, convert } from "../app-const";
import { Injector } from "../inject/injector";
const requiredValidators = require("iwalid").requiredValidators;
const validators = require("iwalid").validators;

@Service.path("/users")
export default class ServiceTitles {
  
  private collection:any;

  constructor() {
    this.collection = Injector.getRegistered(DB_NAME).collection("users");
  }

  @Methods.post("")
  add(@Body() user:User) {
    let u:User&{validate: Function} = convert(user, User);
    u.validate()
    return this.collection.insertOne(user).then( result => result.ops[0]);
  }

  @Methods.patch("/:name")
  update(@Params("name") id:string, @Body() user:User) {
    user["name"] = user["name"];
    return this.collection.findOne({name: user["name"]})
    .then((userToUpdate)=>{
      if (!userToUpdate) throw new NotFoundError();
      return {...userToUpdate, ...user};
    })
    .then((userToUpdate)=>{
      return this.collection.updateOne({name: user["name"]}, userToUpdate).then( result => undefined);
    });
  }

  @Methods.get("/:name")
  get(@Params("name") name:string) {
    return this.collection.findOne({name: name}).then((user)=>{if (!user) throw new NotFoundError(); return user;});
  }
}

@validators.validate(false)
export class User {
  
  id:number;
  @requiredValidators.notEmpty() name:string;
  @requiredValidators.notEmpty() password:string;
  roles: string[];
  active:boolean;
  lastLogin: Date;

  constructor(id:number, name:string, password:string, roles: string[], active:boolean=true){
    this.id = id;
    this.name = name;
    this.password = password;
    this.roles = roles;
    this.active = active;
  };
}
