import { Service, Methods, Params, NotFoundError, RestError } from "threerest";
import { inject } from "../../inject/inject";
import { DB_NAME } from "../../app-const";
import { Injector } from "../../inject/injector";
import { ObjectID } from "mongodb";

@Service.path("/rooms")
export default class RoomService {

  private rooms:Array<Room>;
  private collection:any;
  private devicesCollection:any;


  constructor() {
    this.collection = Injector.getRegistered(DB_NAME).collection("rooms");
    this.devicesCollection = Injector.getRegistered(DB_NAME).collection("devices");
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
  get(@Params("id") id:number) {
    return this.collection.findOne({_id: new ObjectID(id)}).then((room)=>{if (!room) throw new NotFoundError(); return room;});
  }

  @Methods.del("/:id")
  delete(@Params("id") id:number) {
    return this.collection.deleteOne({_id: new ObjectID(id)})
    .then((room)=>{if (!room) throw new NotFoundError();
      return this.collection.deleteMany({_id: new ObjectID(id)})
      .then((device)=>{
        if (!device) throw new NotFoundError();
        return room;
      });
    });
  }

  @Methods.get("/:id/devices")
  getDevices(@Params("id") id:number) {
    return this.collection.findOne({_id: new ObjectID(id)}).then((room)=>{if (!room) throw new NotFoundError(); return room;});
  }
}

class Room {
  constructor(public id:number, public name:string){};
}
