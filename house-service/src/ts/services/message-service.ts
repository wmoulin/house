import { Service, Methods } from "threerest";

@Service.path("/messages")
export default class ServiceTitles {

  @Methods.get("")
  getAll() {
    return {"name": "test"};
  }

  @Methods.post("")
  addMessage(param:{message: string}) {
    return {"name": "test", "id": param};
  }

  @Methods.post("/search")
  getMessages(param:{id:number}) {
    return {"name": "test", "id": param};
  }
}
