import { Service, Methods, Params } from "threerest";

@Service.path("/distrib")
export default class ServiceTitles {

  @Methods.get("")
  getAll() {
    return {"name": "test"};
  }

  @Methods.post("/:id/lunchs")
  addLunch(@Params("id") id:number) {
    return {"name": "test", id};
  }

  @Methods.get("/:id/lunchs")
  getLunchs(@Params("id") id:number) {
    return {"name": "test", id};
  }
}
