import { Service, Methods } from "threerest";

@Service.path("/device")
export default class DeviceService {

  private devices:Array<Device>;

  constructor() {
    this.devices = [];
    this.devices.push(new Device(0, "device_light_" + 0, TYPE.LIGHT));
    this.devices.push(new Device(1, "device_plug_" + 0, TYPE.PLUG));
    this.devices.push(new Device(2, "device_shutter_" + 0, TYPE.SHUTTER));
  }

  @Methods.get("")
  getAll() {
    return this.devices;
  }

  @Methods.post("")
  add(param:{device:Device}) {
    this.devices.push(new Device(this.devices.length, param.device.name, param.device.type));
  }

  @Methods.get("/:id")
  get(param:{id:number}) {
    return this.devices[param.id];
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
