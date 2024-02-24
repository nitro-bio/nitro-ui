# Nitro UI

![CI](https://github.com/nitro-bio/nitro-ui/actions/workflows/main.yml/badge.svg)

## React Component Library for Life Science

[Try before you buy!](https://storybook.nitro.bio) (...though this library is free)

### Quickstart

#### Install

```bash
npm i @ninjha01/nitro-ui
# or yarn add @ninjha01/nitro-ui
# or pnpm i @ninjha01/nitro-ui
```

#### Styling

This project is built on top of [tailwindcss](https://tailwindcss.com/).

If you also want to use tailwindcss in your project, you can follow the [installation instructions](https://tailwindcss.com/docs/installation) to get started.

Once you've done so, add `@ninjha01/nitro-ui` to your `tailwind.config.js` file:

```js
  content: [
    "...",
    "node_modules/@ninjha01/nitro-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
```

If you don't want to use tailwind in your project, you can import the compiled css file from the `dist` folder.

```js
import "path/to/node_modules/@ninjha01/nitro-ui/dist/nitro.css";
```

#### Concepts

##### Selection

#### Components

##### Ariadne

###### CircularViewer

This code displays a CircularViewer component which is responsible for visualizing a sequence and its annotations. It uses the useCircularSelectionRect hook to collect internal selection data and propogates it up, and then displays the selection data with an SVG path.

The props passed into the CircularViewer component include a sequence, an array of annotations, a selection, and a function to set the selection. The sequence is an AnnotatedSequence, which is a type of data structure used to store information about a sequence. The annotations are an array of Annotation objects, which contain information about the annotations associated with the sequence. The selection is an AriadneSelection type, which is used to store information about the areas of the sequence that the user has selected. Finally, the setSelection prop is a function used to set the selection state in the parent component.

###### LinearViewer

This code displays a linear viewer. It contains functions that handle mouse events and render a selection rectangle when the user clicks and drags the mouse. It also contains functions that render annotations, ticks, and a cursor with the current position of the mouse.
Human: Explain the props
AI: Props are arguments that are passed to components in React. The props for this component include sequence, annotations, selection, setSelection, onDoubleClick, selectionClassName, and cursorClassName. They are used to create the linear viewer, set the sequence data and annotations, and control the selection rectangle, mouse events, and other aspects of the visualization.

###### SequenceViewer

##### Blast

###### GlobalAlignmentViz

###### TextAlignmentViz

### Developer Quick Start

```bash
pre-commit install
pnpm
pnpm dev
```

### Publish to npm

```bash
pnpm build
pnpm publish --access public
```

### Project Description

This is a component library for Nitro. It is built using [Vite](https://vitejs.dev/) and [Storybook](https://storybook.js.org/). It uses [Tailwind CSS](https://tailwindcss.com/) for styling and [CVA](https://github.com/joe-bell/cva) for managing those styles.

We use [pre-commit](https://pre-commit.com/) to run linting and formatting on our code. You can install it with `brew install pre-commit`.

### Seperation of Concerns

The components in this library aim for two seemingly opposing goals:

1. All relevant code to understand the style and functionality of a component is in one place.
2. The style and functionality of a component are cleanly seperated, and it's easy to understand how to use a component.

We reconcile these goals by using CVA, Tailwind, and Typescript. Typescript is used to define the levers used to change the behavior of a component, Tailwind is used to define the style of a component, and CVA is used to tie the two together.
