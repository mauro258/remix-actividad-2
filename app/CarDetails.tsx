import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { FunctionComponent } from "react";
import { getCar, updateCar, deleteCar } from "../app/data";
import type { CarRecord } from "../app/data";
import invariant from "tiny-invariant";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.carId, "Missing carId param");
  const car = await getCar(params.carId);
  if (!car) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ car });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  invariant(params.carId, "Missing carId param");
  const formData = await request.formData();
  const actionType = formData.get("action");

  if (actionType === "delete") {
    await deleteCar(params.carId);
    return json({ success: true });
  }

  if (actionType === "edit") {
    const updatedCar = {
      brand: formData.get("brand"),
      model: formData.get("model"),
      price: formData.get("price"),
    };
    return json({ success: true });
  }
};

export default function Car() {
  const { car } = useLoaderData<typeof loader>();
  return (
    <div id="car">
      <div>
        <img
          alt={`${car.brand} ${car.model}`}
          key={car.image}
          src={car.image}
        />
      </div>
      <div>
        <h1>
          {car.brand} {car.model} - {car.price} <Favorite car={car} />
        </h1>
        {car.description ? <p>{car.description}</p> : null}
        <div>
          {/* Formulario de edición */}
          <Form method="post">
            <input type="hidden" name="action" value="edit" />
            <label>
              Marca: <input type="text" name="brand" defaultValue={car.brand} required />
            </label>
            <label>
              Modelo: <input type="text" name="model" defaultValue={car.model} required />
            </label>
            <label>
              Precio: <input type="text" name="price" defaultValue={car.price} required />
            </label>
            <button type="submit">Guardar Cambios</button>
          </Form>
          {/* Botón de eliminar */}
          <Form method="post"
            onSubmit={(event) => {
              const response = confirm("¿Estás seguro de eliminar este auto?");
              if (!response) {
                event.preventDefault();
              }
            }}>
            <input type="hidden" name="action" value="delete" />
            <button type="submit">Eliminar</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

const Favorite: FunctionComponent<{ car: Pick<CarRecord, "favorite"> }> = ({ car }) => {
  const favorite = car.favorite;
  return (
    <Form method="post">
      <button
        aria-label={
          favorite ? "Remove from favorites" : "Add to favorites"
        }
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
};
