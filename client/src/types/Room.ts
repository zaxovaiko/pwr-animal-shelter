import { Building } from "./Building";

export type Room = {
    id: string;
    number: string;
    capacity: string;
    building: Building;
}