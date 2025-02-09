import { json, redirect, type ActionFunction, type LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getCar, updateCar } from "../app/data";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.carId, "Falta el ID del auto");
  const car = getCar(params.carId);
  if (!car) {
    throw new Response("No encontrado", { status: 404 });
  }
  return json({ car });
};

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.carId, "Falta el ID del auto");
  const formData = await request.formData();
  const updatedCar = {
    brand: formData.get("brand") as string,
    model: formData.get("model") as string,
    price: formData.get("price") as string,
    image: formData.get("image") as string,
  };
  updateCar(params.carId, updatedCar);
  return redirect(`/cars/${params.carId}`);
};

export default function EditCar() {
  const { car } = useLoaderData<typeof loader>();
  return (
    <Form method="post">
      <label>
        Marca: <input type="text" name="brand" defaultValue={car.brand} required />
      </label>
      <label>
        Modelo: <input type="text" name="model" defaultValue={car.model} required />
      </label>
      <label>
        Precio: <input type="text" name="price" defaultValue={car.price} required />
      </label>
      <label>
        Imagen URL: <input type="text" name="image" defaultValue={car.image} required />
      </label>
      <button type="submit">Guardar Cambios</button>
    </Form>
  );
}
