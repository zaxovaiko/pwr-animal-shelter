import { User } from "./User";
import { Animal } from "./Animal";

type Entity = {
  id: string;
  value: string;
};

export type ReservationStatus = Entity;

export type AnimalReservation = {
  id: string;
  user: User;
  animal: Animal;
  reservation_status: ReservationStatus;
  date: string;
};
