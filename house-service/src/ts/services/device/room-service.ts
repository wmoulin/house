import { Service, Methods, NotFoundError } from "threerest";

@Service.path("/rooms")
export default class RoomService {

  private rooms:Array<Room>;

  constructor() {
    this.rooms = [];
    for(let i = 0; i < 3; i++) {
      this.rooms.push(new Room(i, "room_" + i));
    }

  }

  @Methods.get("")
  getAll() {
    return this.rooms;
  }

  @Methods.post("")
  add(param:{room:Room}) {
    this.rooms.push(new Room(this.rooms.length, param.room.name));
  }

  @Methods.get("/:id")
  get(param:{id:number}) {
    if(0 < param.id || param.id > this.rooms.length) throw new NotFoundError();
    return this.rooms[param.id];
  }
}

class Room {
  constructor(public id:number, public name:string){};
}
