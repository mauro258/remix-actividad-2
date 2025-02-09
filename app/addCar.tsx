import { redirect, type ActionFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createCar } from "../app/data";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const newCar = {
    brand: formData.get("brand") as string,
    model: formData.get("model") as string,
    price: formData.get("price") as string,
    image: formData.get("image") as string,
  };
  createCar(newCar);
  return redirect("/cars");
};

export default function AddCar() {
  return (
    <Form method="post">
      <label>
        Marca: <input type="text" name="brand" required />
      </label>
      <label>
        Modelo: <input type="text" name="model" required />
      </label>
      <label>
        Precio: <input type="text" name="price" required />
      </label>
      <label>
        Imagen URL: <input type="text" name="image" required />
      </label>
      <button type="submit">Agregar Auto</button>
    </Form>
  );
}
