import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { FunctionComponent } from "react";
import { getCar, CarRecord } from "../app/data";

import invariant from "tiny-invariant";
import type { LoaderFunctionArgs } from "@remix-run/node";

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
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const response = confirm(
                "Please confirm you want to delete this record."
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

const Favorite: FunctionComponent<{
  car: Pick<CarRecord, "favorite">;
}> = ({ car }) => {
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
