import { Service, Methods, Body } from "threerest";

@Service.path("/messages")
export default class ServiceTitles {

  @Methods.get("")
  getAll() {
    return {"name": "test"};
  }

  @Methods.post("")
  addMessage(@Body() param:{message: string}) {
    return {"name": "test", "id": param};
  }

  @Methods.post("/search")
  getMessages(@Body() param:{id:number}) {
    return {"name": "test", "id": param};
  }
}
