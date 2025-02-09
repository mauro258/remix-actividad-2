export type CarRecord = {
  id: string;
  brand: string;
  model: string;
  price: string;
  image: string; // Asegúrate de que esta línea exista
  description?: string;
  favorite?: boolean;
};

const cars: CarRecord[] = [
  {
    id: "toyota-corolla",
    image:
      "https://www.shutterstock.com/image-vector/icon-logo-sign-art-sedan-600nw-2484157269.jpg",
    brand: "Toyota",
    model: "Corolla",
    price: "$20,000",
  },
  {
    id: "ford-mustang",
    image:
      "https://acroadtrip.blob.core.windows.net/catalogo-imagenes/xl/RT_V_8a256cee2c51489a9b2d7f7144d5645c.webp",
    brand: "Ford",
    model: "Mustang",
    price: "$35,000",
  },
  {
    id: "bmw-x5",
    image:
      "https://autosdeprimera.com/wp-content/uploads/2024/04/bmw-x5-plug-in-hybrid-2023-frente.jpg",
    brand: "BMW",
    model: "X5",
    price: "$60,000",
  },
  {
    id: "audi-a4",
    image:
      "https://hips.hearstapps.com/es.h-cdn.co/cades/contenidos/49922/audi-a4-2018-01.jpg",
    brand: "Audi",
    model: "A4",
    price: "$50,000",
  },
];

export function getCar(id: string): CarRecord | undefined {
  return cars.find((car) => car.id === id);
}

export function getCars(): CarRecord[] {
  return cars;
}
