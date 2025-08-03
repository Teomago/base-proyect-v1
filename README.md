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

### HeroUI Integration with Tailwind CSS

1. **Create HeroUI Configuration File**
   Create a file named `hero.ts` in the `(frontend)` folder with the following content:
   ```typescript
   // hero.ts
   import { heroui } from "@heroui/react";
   export default heroui();
   ```

2. **Update Main CSS File**
   Add the following lines to the `styles.css` file located in the `(frontend)` folder:
   ```css
   @import 'tailwindcss';
   @plugin './hero.ts';
   /* Note: You may need to change the path to fit your project structure */
   @source '../../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}';
   @custom-variant dark (&:is(.dark *));
   ```

3. **Set Language Mode to Tailwind CSS**
   After updating the `styles.css` file, press `Ctrl+Shift+P` in VS Code, search for `Change Language Mode`, and select `Tailwind CSS` to ensure the rules are recognized correctly.

This completes the integration of HeroUI with Tailwind CSS.

### Finalizing HeroUI Integration

1. **Create a Provider Component**
   Create a file named `providers.tsx` in the `(frontend)` folder with the following content:
   ```tsx
   // app/providers.tsx
   'use client';

   import { HeroUIProvider } from '@heroui/react';

   export function Providers({ children }: { children: React.ReactNode }) {
     return (
       <HeroUIProvider>
         {children}
       </HeroUIProvider>
     );
   }
   ```

2. **Update the Root Layout**
   Modify the `layout.tsx` file in the `(frontend)` folder to include the `Providers` component and ensure Tailwind CSS styles are applied. The updated file should look like this:
   ```tsx
   import React from 'react';
   import './styles.css';
   import { Providers } from './providers';

   export const metadata = {
     description: 'A blank template using Payload in a Next.js app.',
     title: 'Payload Blank Template',
   };

   export default async function RootLayout(props: { children: React.ReactNode }) {
     const { children } = props;

     return (
       <html lang="en" className="dark">
         <Providers>
           <body>
             <main>{children}</main>
           </body>
         </Providers>
       </html>
     );
   }
   ```

This completes the integration of HeroUI with Payload and Next.js.

### Important Note for HeroUI Usage 🚨

When using HeroUI components, **you must import the component from the individual package**, not from `@heroui/react`. This is crucial to avoid potential problems or incompatibilities.

#### Example:
```tsx
// app/page.tsx
import { Button } from '@heroui/button';

export default function Page() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
```

Always ensure that your imports follow this pattern to maintain compatibility and proper functionality.

### Handling Undefined Object Errors in Next.js

When working with Next.js and libraries like Payload CMS, you might encounter runtime errors related to undefined objects. These errors often occur due to the mismatch between server-side and client-side rendering contexts.

#### Solution

To resolve this issue, ensure that any code relying on client-side-only libraries or objects is executed within a client-side context. For example, you can:

1. Use dynamic imports with `ssr: false` for components that depend on client-side libraries.
2. Wrap client-side logic in `useEffect` or similar hooks to ensure it only runs after the component has mounted.

#### Example

In the `page.tsx` file, the following approach was used to avoid undefined object errors:

```tsx
const headers = await getHeaders();
const payloadConfig = await config;
const payload = await getPayload({ config: payloadConfig });
const { user } = await payload.auth({ headers });
```

This ensures that the `payload.auth` method is executed in a server-side context where the required headers are available, preventing runtime errors.

### Additional Notes on Handling Undefined Object Errors

To further streamline the approach between server-side and client-side rendering, it is recommended to:

1. **Separate Components**: Create components specifically for server-side or client-side rendering to avoid mixing contexts. This ensures a clear separation of concerns and reduces potential runtime errors.

2. **Dedicated Pages**: Use dedicated pages for server-side or client-side logic instead of combining both in a single page.

3. **HeroUI Specific Note**: When using HeroUI components, always include `'use client'` at the top of the file to ensure proper client-side rendering.

#### Example

For HeroUI components:

```tsx
'use client';

import { Button } from '@heroui/button';

export default function Page() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
```

This ensures that HeroUI components are rendered correctly in a client-side context.

### Email Configuration with Brevo

To implement email functionality using Brevo, follow these steps:

1. **Environment Variables Configuration**:
   Add the following environment variables to the `.env` file of the project:

   ```properties
   BREVO_API_KEY=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
   BREVO_EMAILS_ACTIVE=true
   BREVO_SENDER_NAME=Teomago
   BREVO_SENDER_EMAIL=teo.ibagon@gmail.com
   ```

   - `BREVO_API_KEY`: The API key provided by Brevo to authenticate requests.
   - `BREVO_EMAILS_ACTIVE`: Controls whether email sending is enabled or not.
   - `BREVO_SENDER_NAME`: The sender's name that will appear in the sent emails.
   - `BREVO_SENDER_EMAIL`: The sender's email address.

2. **Create the `brevoAdapter.ts` File**:
   Inside the `src/utils` folder, create a file named `brevoAdapter.ts` with the following content:

   ```typescript
   import axios from 'axios'
   import { EmailAdapter, SendEmailOptions } from 'payload'

   const brevoAdapter = (): EmailAdapter => {
     const adapter = () => ({
       name: 'Brevo',
       defaultFromAddress: process.env.BREVO_SENDER_EMAIL as string,
       defaultFromName: process.env.BREVO_SENDER_NAME as string,
       sendEmail: async (message: SendEmailOptions): Promise<unknown> => {
         if (!process.env.BREVO_EMAILS_ACTIVE) {
           console.log('Emails disabled, logging to console')
           console.log(message)
           return
         }
         try {
           const res = await axios({
             method: 'post',
             url: 'https://api.brevo.com/v3/smtp/email',
             headers: {
               'api-key': process.env.BREVO_API_KEY as string,
               'Content-Type': 'application/json',
               Accept: 'application/json',
             },
             data: {
               sender: {
                 name: process.env.BREVO_SENDER_NAME as string,
                 email: process.env.BREVO_SENDER_EMAIL as string,
               },
               to: [
                 {
                   email: message.to,
                 },
               ],
               subject: message.subject,
               htmlContent: message.html,
             },
           })

           console.log('Email sent successfully')
           return res.data
         } catch (error) {
           console.error('Error sending email with Brevo:', error)
           throw error
         }
       },
     })

     return adapter
   }

   export default brevoAdapter
   ```

3. **Install Axios**:
   Ensure the `axios` library is installed in the project. If not, install it using the following command:

   ```bash
   pnpm install axios
   ```

4. **Configuration in `payload.config.ts`**:
   Import the `brevoAdapter` and configure it in `buildConfig` as the email handler:

   ```typescript
   import brevoAdapter from './utils/brevoAdapter';

   export default buildConfig({
     // ...existing code...
     email: brevoAdapter(),
     // ...existing code...
   });
   ```

5. **Restart the Server**:
   To apply the configuration correctly, restart the development server. Stop and re-run the project using the following command:

   ```bash
   pnpm dev
   ```

These steps ensure that the email functionality is correctly configured and ready to be used in the project.
