# Nitro Bio Sequence Viewers

![CI](https://github.com/nitro-bio/nitro-ui/actions/workflows/main.yml/badge.svg)

## React Components for visualizing linear and circular DNA

[Documentation](https://docs.nitro.bio)
[Quickstart](https://docs.nitro.bio/quickstart)

### Sequence Viewer
<img width="911" alt="image" src="https://github.com/user-attachments/assets/8771fcc4-e89b-4f55-87e8-3712d82343b6" />
![CleanShot 2024-12-19 at 08 08 26@2x](https://github.com/user-attachments/assets/66bee183-4a1b-4d9f-aec6-0f4244709e2e)

### Circular Viewer
![CleanShot 2024-12-19 at 08 09 16@2x](https://github.com/user-attachments/assets/38611339-cab9-4094-91b9-b614b370d8df)
![CleanShot 2024-12-19 at 08 09 08@2x](https://github.com/user-attachments/assets/84d3be46-cb46-4214-a15a-cdbc7c1f918c)

### Linear Viewer
![CleanShot 2024-12-19 at 08 09 40@2x](https://github.com/user-attachments/assets/6b7a6cf0-479b-4e34-a984-58b64ec90c92)
![CleanShot 2024-12-19 at 08 09 50@2x](https://github.com/user-attachments/assets/71d7f846-ac3d-40f2-bdae-479cc088953c)

## Development

### Scripts

This project uses pnpm as the package manager. Here's a list of available scripts:

### Frequently Used in Local dev

- `dev`: Runs Storybook development server on port 6006.
- `format:fix`: Fixes code formatting issues using Prettier.
- `lint:fix`: Fixes linting issues automatically.
- `build`: Lints, builds the project, and generates CSS.
- `build-css`: Builds and minifies Tailwind CSS.
- `test`: Runs tests using Vitest.

### CI

- `build:ci`: Builds the project for CI environments.
- `build-storybook`: Builds Storybook for production.
- `format`: Checks code formatting using Prettier.
- `lint`: Runs TypeScript compiler and ESLint.

### Publishing/Library dev

- `publish`: Publishes the package to NPM.
- `prepublishOnly`: Runs linting, formatting, and build before publishing.
- `build:watch`: Watches for changes and rebuilds the project.
- `test:watch`: Runs tests in watch mode.

### Usage

To run a script, use:

```
pnpm <script-name>
```

For example:

```
pnpm dev
```

This will start the Storybook development server.

## Notable Dependencies

### Frameworks

- React

### Buildtime Utilities

- Vite (Build tool and development server)
- TypeScript (Static typing)
- ESLint and Prettier (Code linting and formatting)
- Vitest (Testing framework)
- Storybook (UI component development and documentation)

### Styling

- Tailwind CSS (Utility-first CSS framework)
- Radix UI (Accessible UI components)
- Lucide Icons
