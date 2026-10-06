# User Management

This project uses a Vite/React frontend and a JSON Server API.

## Run locally

Start the API from the `Backend` directory:

```sh
npm install
npm start
```

Start the frontend from the `Frontend` directory in a second terminal:

```sh
npm install
npm run dev
```

The API listens on `http://localhost:3000`; its initial data is in
`Backend/database/db.json`.

## Checks

Run `npm run build` and `npm run lint` in `Frontend`, and `npm test` in
`Backend`.
