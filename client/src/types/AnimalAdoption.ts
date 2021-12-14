import { User } from "./User";
import { Animal } from "./Animal";

export type AnimalAdoption = {
  user: User;
  animal: Animal;
  date: string;
};
