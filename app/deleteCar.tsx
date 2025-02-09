import { redirect, type ActionFunction } from "@remix-run/node";
import { deleteCar } from "../app/data";
import invariant from "tiny-invariant";

export const action: ActionFunction = async ({ params }) => {
  invariant(params.carId, "Falta el ID del auto");
  deleteCar(params.carId);
  return redirect("/cars");
};

export default function DeleteCar() {
  return <p>Eliminando auto...</p>;
}
