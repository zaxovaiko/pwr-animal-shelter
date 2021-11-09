type Entity = {
  id: string;
  value: string;
};

export type AnimalBreed = Entity;
export type AnimalStatus = Entity;
export type AnimalType = Entity;
export type AnimalGender = Entity;

export type Animal = {
  id: string;
  chip_code: string;
  name: string;
  age: number;
  animal_type: AnimalType;
  animal_gender: AnimalGender;
  animal_breed: AnimalGender;
  color: string;
  image: string;
  height: number;
  description: string;
  vaccinations: string;
  animal_status: AnimalStatus;
};
