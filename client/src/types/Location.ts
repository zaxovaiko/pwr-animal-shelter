import { Room } from "./Room";
import { Animal } from "./Animal";
import { Building } from "./Building";

export type AnimalLocation = {
  room: Room;
  animal: Animal;
  building: Building;
  date_from: string;
  date_to: string;
};
