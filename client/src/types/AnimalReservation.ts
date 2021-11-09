import { User } from "./User";
import { Animal } from "./Animal";

type Entity = {
  id: string;
  value: string;
};

export type ReservationStatus = Entity;

export type AnimalReservation = {
  id: string;
  date: string;
  animal: Animal;
  reservation_status: ReservationStatus;
  user: User;
};
