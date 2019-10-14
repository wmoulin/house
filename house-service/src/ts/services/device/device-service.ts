import { Service, Methods, Params, NotFoundError } from "threerest";
import { DB_NAME, SSE_KEY } from "../../app-const";
import { Injector } from "../../inject/injector";
import { ObjectID } from "mongodb";
import { Response } from "express";

declare global {
  namespace Express {
    interface Response {
      sseSend?: (data:any, evtName?:string) => void;
    }
  }
}

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

  @Methods.patch("/:_id")
  update(device:Device) {
    device["_id"] = new ObjectID(device["_id"]);
    return this.collection.findOne({_id: device["_id"]})
    .then((deviceToUpdate)=>{
      if (!deviceToUpdate) throw new NotFoundError();
      if(device && typeof(device.active) == "boolean" && device.active !== deviceToUpdate.active && deviceToUpdate.disabledTime) {
        Injector.getRegistered(SSE_KEY).forEach((connexion: Response)=> {
          connexion.sseSend({...deviceToUpdate, ...device}, "disabled");
          setTimeout(()=>{
            connexion.sseSend({...deviceToUpdate, ...device}, "enabled");
          }, deviceToUpdate.disabledTime*1000)
        });
      }
      return {...deviceToUpdate, ...device};
    })
    .then((deviceToUpdate)=>{
      return this.collection.updateOne({_id: new ObjectID(deviceToUpdate["_id"])}, deviceToUpdate).then( result => undefined);
    });
    
  }

  @Methods.get("/:id")
  get(@Params("id") id:number) {
    return this.collection.findOne({_id: new ObjectID(id)}).then((device)=>{if (!device) throw new NotFoundError(); return device;});
  }

  @Methods.get("/:id/active")
  getActive(@Params("id") id:number) {
    return this.collection.findOne(Object.assign({}, ObjectID.isValid(id) ? {_id: new ObjectID(id)} : {customId: id})).then((device)=>{if (!device) throw new NotFoundError(); return device.active;});
  }

  @Methods.del("/:id")
  delete(@Params("id") id:number) {
    return this.collection.deleteOne({_id: new ObjectID(id)}).then((device)=>{if (!device) throw new NotFoundError(); return device;});
  }
}

class Device {
  constructor(public id:number, public customId:string, public name:string, public type:TYPE, public active:boolean, public disabledTime :number){};
}

enum TYPE {
  LIGHT = 1,
  PLUG,
  SHUTTER
}
