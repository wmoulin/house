import { Service, Methods, NotFoundError, RestError } from "threerest";
import { inject } from "../../inject/inject";
import { DB_NAME } from "../../app-const";
import { Injector } from "../../inject/injector";
import { ObjectID } from "mongodb";

@Service.path("/rooms")
export default class RoomService {

  private rooms:Array<Room>;
  private collection:any;


  constructor() {
    this.collection = Injector.getRegistered(DB_NAME).collection("rooms");
  }

  @Methods.get("")
  getAll() {
    return this.collection.find({}).toArray();
  }

  @Methods.post("", 201)
  add(room:Room) {
    return this.collection.insertOne(room).then( result => result.ops[0]);
  }

  @Methods.patch("/:_id")
  update(room:Room) {
    room["_id"] = new ObjectID(room["_id"]);
    
    return this.collection.findOne({_id: room["_id"]})
    .then((roomtoUpdate)=>{
      if (!roomtoUpdate) throw new NotFoundError();
      return Object.assign(roomtoUpdate, room);
    })
    .then((roomtoUpdate)=>{
      return this.collection.updateOne({_id: new ObjectID(roomtoUpdate["_id"])}, roomtoUpdate).then( result => undefined);
    });
    
  }

  @Methods.get("/:id")
  get(param:{id:number}) {
    return this.collection.findOne({_id: new ObjectID(param.id)}).then((room)=>{if (!room) throw new NotFoundError(); return room;});
  }

  @Methods.del("/:id")
  delete(param:{id:number}) {
    return this.collection.deleteOne({_id: new ObjectID(param.id)}).then((room)=>{if (!room) throw new NotFoundError(); return room;});
  }

  @Methods.get("/:id/devices")
  getDevices(param:{id:number}) {
    return this.collection.findOne({_id: new ObjectID(param.id)}).then((room)=>{if (!room) throw new NotFoundError(); return room;});
  }
}

class Room {
  constructor(public id:number, public name:string){};
}
