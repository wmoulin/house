import { Service, Methods } from "threerest";

@Service.path("/distrib")
export default class ServiceTitles {

  @Methods.get("")
  getAll() {
    return {"name": "test"};
  }

  @Methods.post("/:id/lunchs")
  addLunch(param:{id:number}) {
    return {"name": "test", "id": param};
  }

  @Methods.get("/:id/lunchs")
  getLunchs(param:{id:number}) {
    return {"name": "test", "id": param};
  }
}
