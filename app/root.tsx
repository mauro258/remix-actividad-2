import type { LinksFunction } from "@remix-run/node";
import appStylesHref from "./app.css";
import { json } from "@remix-run/node";
import {
  Form,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { getCars } from "./data";
export const loader = async () => {
  const cars = await getCars();
  return json({ cars });
};
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];
export default function App() {
  const { cars } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Cars</h1>
          <div>
            <Form id="search-form" role="search">
              <input type="search" name="q" placeholder="Search cars..." />
              <button type="submit">Search</button>
            </Form>
          </div>
          <nav>
            {cars.length ? (
              <ul>
                {cars.map((car) => (
                  <li key={car.id}>
                    <Link to={`cars/${car.image}`}>
                      {car.brand} {car.model} - {car.price}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No cars available</i>
              </p>
            )}
          </nav>
        </div>
        <div id="detail">
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
