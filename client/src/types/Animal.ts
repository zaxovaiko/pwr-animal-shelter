export type AnimalBreed = {
    id: string;
    value: string;
};

export type AnimalStatus = {
    id: string;
    value: string;
};

export type AnimalType = {
    id: string;
    value: string;
};

export type AnimalGender = {
    id: string;
    value: string;
};

export type Animal = {
    id: string;
    chip_code: string;
    name: string;
    age: number;
    animal_type: AnimalType;
    animal_gender: AnimalGender;
    animal_breed: AnimalGender;
    color: string;
    height: number;
    description: string;
    vaccinations: string;
    animal_status: AnimalStatus;
};