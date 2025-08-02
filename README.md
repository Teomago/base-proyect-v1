# Payload Blank Template

This template comes configured with the bare minimum to get started on anything you need.

## Quick start

This template can be deployed directly from our Cloud hosting and it will setup MongoDB and cloud S3 object storage for media.

## Quick Start - local setup

To spin up this template locally, follow these steps:

### Clone

After you click the `Deploy` button above, you'll want to have standalone copy of this repo on your machine. If you've already cloned this repo, skip to [Development](#development).

### Development

1. First [clone the repo](#clone) if you have not done so already
2. `cd my-project && cp .env.example .env` to copy the example environment variables. You'll need to add the `MONGODB_URI` from your Cloud project to your `.env` if you want to use S3 storage and the MongoDB database that was created for you.

3. `pnpm install && pnpm dev` to install dependencies and start the dev server
4. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user. Then check out [Production](#production) once you're ready to build and serve your app, and [Deployment](#deployment) when you're ready to go live.

#### Docker (Optional)

If you prefer to use Docker for local development instead of a local MongoDB instance, the provided docker-compose.yml file can be used.

To do so, follow these steps:

- Modify the `MONGODB_URI` in your `.env` file to `mongodb://127.0.0.1/<dbname>`
- Modify the `docker-compose.yml` file's `MONGODB_URI` to match the above `<dbname>`
- Run `docker-compose up` to start the database, optionally pass `-d` to run in the background.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this template locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

## Project Setup and Updates

### Initial Setup

1. **Install Dependencies**
   ```bash
   pnpm install
   ```
   This command installs all the dependencies defined in the `package.json` file.

2. **Check for Outdated Dependencies**
   ```bash
   pnpm outdated
   ```
   This command lists all outdated dependencies in the project.

3. **Update Dependencies**
   ```bash
   pnpm update
   ```
   This command updates all outdated dependencies to their latest stable versions.

4. **Verify Payload and Next.js Functionality**
   Start the development server to ensure everything is working correctly:
   ```bash
   pnpm dev
   ```
   Open your browser and navigate to `http://localhost:3000` to verify the application is running.

5. **Generate Import Map**
   ```bash
   pnpm payload generate:importmap
   ```
   This command generates the `importMap.js` file in the path `src/app/(payload)/admin/`. Ensure to run this command every time you add new collections or fields that depend on specific components of Payload CMS.

### Tailwind CSS Integration

1. **Install Tailwind CSS and Dependencies**
   ```bash
   pnpm install tailwindcss @tailwindcss/postcss postcss
   ```
   This command installs Tailwind CSS along with its required dependencies.

2. **Approve Builds**
   ```bash
   pnpm approve-builds
   ```
   Approves the builds for `@tailwindcss/oxide` to ensure compatibility.

3. **Configure PostCSS**
   Create a file named `postcss.config.mjs` in the root of the project and add the following configuration:
   ```javascript
   const config = {
     plugins: {
       '@tailwindcss/postcss': {},
     },
   };
   export default config;
   ```

4. **Import Tailwind CSS**
   Add the following line at the beginning of the global styles file `styles.css` located in `src/app/(frontend)/`:
   ```css
   @import "tailwindcss";
   ```

5. **Test Tailwind CSS**
   Use utility classes like `bg-indigo-900` or `text-4xl` in the `page.tsx` file to verify Tailwind CSS functionality.

### Example Component to Test Tailwind CSS

To verify that Tailwind CSS v4 is working correctly, you can use the following example component in your `page.tsx` file:

```tsx
<div className="bg-gray-700 font-mono p-8 rounded-lg shadow-xl shadow-zinc-800">
  <h1 className="w-fit font-bold size-16">Titulo de prueba</h1>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat excepturi reiciendis nisi
    explicabo provident vitae amet blanditiis autem quo. Recusandae inventore eius optio
    laborum quis quam voluptas nesciunt, deleniti soluta.
  </p>
</div>
```

This component uses Tailwind CSS utility classes to style a simple card layout. If the styles render as expected, Tailwind CSS is functioning correctly.

### Notes
- The project uses `pnpm` as the package manager.
- Ensure that your Node.js version matches the requirements specified in the `package.json` file under the `engines` field.
- The `test.env` file includes specific Node.js options to suppress deprecation warnings and experimental features.

### Future Steps
Each time we make progress in the project, this README will be updated with detailed documentation of the steps taken, including commands and code snippets.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
