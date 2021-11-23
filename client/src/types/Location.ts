import { Room } from "./Room";
import { Animal } from "./Animal";

export type AnimalLocation = {
    room: Room;
    animal: Animal;
    building: any;
    date_from: string;
    date_to: string;
}