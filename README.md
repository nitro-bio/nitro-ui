# Component Library for Nitro

## Use in a project

This library is still in Alpha, so use at your own risk.

First, install from npm

```
npm install @ninjha01/nitro-ui
```

If you'd like to use the builtin tailwind config, make sure to import the css file.

```
import "@ninjha01/nitro-ui/nitro.css"
```

If you'd like to use your own tailwind config, add the following to your tailwind config file.

```
module.exports = {
	...
	content: [
		...
		"node_modules/@ninjha01/nitro-ui/dist/**/*.{js,ts,jsx,tsx}",
	],
	...
}
```

## Development

### Quick Start

```bash
pre-commit install
yarn
yarn dev
```

### Publish to npm

```bash
yarn build
yarn publish --access public
```

### Project Description

This is a component library for Nitro. It is built using [Vite](https://vitejs.dev/) and [Storybook](https://storybook.js.org/). It uses [Tailwind CSS](https://tailwindcss.com/) for styling and [CVA](https://github.com/joe-bell/cva) for managing those styles.

We use [pre-commit](https://pre-commit.com/) to run linting and formatting on our code. You can install it with `brew install pre-commit`.

### Seperation of Concerns

The components in this library aim for two seemingly opposing goals:

1. All relevant code to understand the style and functionality of a component is in one place.
2. The style and functionality of a component are cleanly seperated, and it's easy to understand how to use a component.

We reconcile these goals by using CVA, Tailwind, and Typescript. Typescript is used to define the levers used to change the behavior of a component, Tailwind is used to define the style of a component, and CVA is used to tie the two together.
