import { Service, Methods } from "threerest";

@Service.path("/test")
export default class ServiceTitles {

  @Methods.get("")
  getAll() {
    return {"name": "test"};
  }

  @Methods.get("/:id")
  getId(param:{id:number, message:string}) {
    return {"name": "test", "id": param};
  }
}
