import { Service, Methods, NotFoundError } from "threerest";
import { inject } from "../../inject/inject";
import { DB_NAME } from "../../app-const";
import { Injector } from "../../inject/injector";
import { ObjectID } from "mongodb";

@Service.path("/devices")
export default class DeviceService {

  private collection:any;

  constructor() {
    this.collection = Injector.getRegistered(DB_NAME).collection("devices");
  }

  @Methods.get("")
  getAll() {
    return this.collection.find({}).toArray();
  }

  @Methods.post("")
  add(device:Device) {
    return this.collection.insertOne(device).then( result => result.ops[0]);
  }

  @Methods.get("/:id")
  get(param:{id:number}) {
    return this.collection.findOne({_id: new ObjectID(param.id)}).then((device)=>{if (!device) throw new NotFoundError(); return device;});
  }

  @Methods.del("/:id")
  delete(param:{id:number}) {
    return this.collection.deleteOne({_id: new ObjectID(param.id)}).then((device)=>{if (!device) throw new NotFoundError(); return device;});
  }
}

class Device {
  constructor(public id:number, public name:string, public type:TYPE){};
}

enum TYPE {
  LIGHT = 1,
  PLUG,
  SHUTTER
}
