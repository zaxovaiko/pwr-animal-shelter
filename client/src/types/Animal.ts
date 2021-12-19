type Entity = {
  id: string;
  value: string;
};

export type AnimalBreed = Entity;
export type AnimalStatus = Entity;
export type AnimalType = Entity;
export type AnimalGender = Entity;
export type AnimalImage = {
  id: string;
  image: string;
  animal?: Animal;
};

export type Animal = {
  id: string;
  chip_code: string;
  name: string;
  age: number;
  animal_type: AnimalType;
  animal_gender: AnimalGender;
  animal_breed: AnimalBreed;
  color: string;
  image: string;
  images: [AnimalImage];
  height: number;
  weight: number;
  description: string;
  vaccinations: string;
  animal_status: AnimalStatus;
};
