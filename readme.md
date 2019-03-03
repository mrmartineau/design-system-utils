<h1 align="center">
  👩‍🎨 <br/>
  Design System Utils

[![npm](https://img.shields.io/npm/v/design-system-utils.svg?style=flat-square)](https://www.npmjs.com/package/design-system-utils)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/design-system-utils.svg?style=flat-square)](https://www.npmjs.com/package/design-system-utils) [![Travis CI Build](https://img.shields.io/travis/mrmartineau/design-system-utils.svg?style=flat-square)](https://travis-ci.org/mrmartineau/design-system-utils)
![](https://img.shields.io/badge/licence-MIT-blue.svg?style=flat-square)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

</h1>

Design System Utils is a micro framework that standardises your design-system tokens & provides helpful utility functions to access the information. It can be used with [styled-components](https://styled-components.com), [emotion](https://emotion.sh), [glamorous](https://glamorous.rocks/) or any other [CSS-in-JS framework](https://css-in-js-playground.com/).

## Install

```sh
yarn add design-system-utils

# or

npm install --save design-system-utils
```

### Size

```
$ size-limit

  build/cjs.js
  Package size: 814 B
  Size limit:   1 KB

  es/index.js
  Package size: 806 B
  Size limit:   1 KB

  With all dependencies, minified and gzipped
```

<details>
  <summary>🤓 Table of contents</summary>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Usage](#usage)
  - [Setup](#setup)
  - [Initialise the design system framework](#initialise-the-design-system-framework)
- [Accessing the design system data in your app](#accessing-the-design-system-data-in-your%C2%A0app)
- [Options](#options)
  - [Shortcuts](#shortcuts)
  - [Font Size Unit](#font-size-unit)
- [Basic API methods](#basic-api-methods)
  - [`tokens.get()` - Get a token value](#tokensget---get-a-token-value)
  - [`tokens.set()` - Set a token value](#tokensset---set-a-token-value)
- [Shortcut methods](#shortcut-methods)
  - [`tokens.fontSize()` or `tokens.fs()` - Get font-size values](#tokensfontsize-or-tokensfs---get-font-size-values)
    - [Modular scale](#modular-scale)
  - [Color palette](#color-palette)
    - [`tokens.color()` - Get color palette values](#tokenscolor---get-color-palette-values)
    - [`tokens.brand()` - Get brand palette values](#tokensbrand---get-brand-palette-values)
  - [`tokens.bp()` - Get responsive breakpoint values](#tokensbp---get-responsive-breakpoint-values)
  - [`tokens.z()` - Get `z-index` values](#tokensz---get-z-index-values)
  - [`tokens.spacing()` or `tokens.space()` - Get spacing values](#tokensspacing-or-tokensspace---get-spacing-values)
    - [Array example:](#array-example)
    - [Object example:](#object-example)
  - [Calculations](#calculations)
    - [`tokens.multiply()`](#tokensmultiply)
    - [`pxTo()`](#pxto)
    - [`toPx()`](#topx)
    - [`parseUnit()`](#parseunit)
- [Usage with Typescript](#usage-with-typescript)
- [Demo & examples](#demo--examples)
- [Licence](#licence)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

</details>

## Usage

First create your design system file, this contains all your design tokens that your app or site will use; things like font-sizes, color palette, spacing etc (kind of like a Sass/Less variables file).

For example you can create a top-level directory named `tokens`, `theme` or `designsystem`, and add an index.js inside, like so:

```
./tokens
└── index.js
```

A simple version of a tokens file with Design System Utils:

```js
// ./tokens/index.js
import DesignSystem from 'design-system-utils'

// your design tokens object goes here, see below for further details
const designTokens = {...}

export default new DesignSystem(designTokens)
```

### Setup

The "shape" and structure of your design tokens object **_can_** actually be anything you want, however, if you want to make use of the shortcut/helper methods like `tokens.fontSize|bp|z|color|brand|spacing` etc, there is a particular shape that your data will need to follow, see below:

(🤔 the below code snippet includes some psuedo types for the values that occur in the different parts of the tokens object)

```js
{
  type: {
    // this should be set as a px value if you have `options.fontSizeUnit` set
    // to 'rem' or 'em' so that the lib can convert the values properly
    baseFontSize: '' // string,

    // used with `tokens.fs('size')` or `tokens.fontSize('size')`
    sizes: {
      key: '' // <number | string>,
    },
  },

  // Color palette
  // Each object needs to have the same shape
  // Each color object needs a `base` value to be the default
  // Have as many color objects as you like
  colors: {
    // Used with `ds.color('colorName')`
    colorPalette: {
      colorName: {
        base: '' // <string>, // base is the default
      },
    },

    // Used with `ds.brand('colorName)`
    brand: {
      colorName: '' // <string>, base is the default
    }
  },

  // Breakpoints
  // Used with `ds.bp()`
  // Keys can be anything you like
  // Have as many breakpoints as you like
  // Values can be use any unit you like
  breakpoints: {
    key: '' // <number | string>,
  },

  // Z-index
  // Used with `ds.z()`
  zIndex: {
    key: 10 // <number>
  },

  // Spacing
  // Used with `ds.spacing()` or `ds.space()`
  spacing: {
    scale: [] // <array>[<number | string>, ...], <object>
  },
}
```

Below is an excerpt from the example design-system. See a more complete version in the [`/example`](example/myDesignSystem.js) directory or some that are used in the design-system-utils tests: [1](https://github.com/mrmartineau/design-system-utils/blob/master/src/testData/ds1.js) & [2](https://github.com/mrmartineau/design-system-utils/blob/master/src/testData/ds1.js).

```js
const designTokens = {
  type: {
    baseFontSize: '20px',

    sizes: {
      xs: '16px',
      s: '20px',
      base: '30px',
      m: '36px',
      l: '42px',
      xl: '50px',
      xxl: '58px',
    },

    fontFamily: {
      system:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans"',
      sans: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      serif: 'Georgia, "Times New Roman", Times, serif',
      mono: 'Menlo, Monaco, "Courier New", monospace',
    },

    lineHeight: {
      headings: 1.1,
    },

    fontWeight: {
      normal: 300, // Useful to set here if using anything other than `normal`
      bold: 'bold', // Useful to set here when bold webfonts come as 400 font-weight.
      headings: 'bold', // instead of browser default, bold
    },
  },
}
```

### Initialise the design system framework

```js
// myDesignSystem.js
import DesignSystem from 'design-system'
const designTokens = {...}
export default new DesignSystem(designTokens)
```

## Accessing the design system data in your app

To access your design system, you just need to `import` it to the current file, like so:

```js
import tokens from './tokens' // assuming you exported `default` from your design system file
```

Here is a very simple component using [styled-components](https://styled-components.com) and some values from the tokens, you should be able to see how easy it is to pull information from the design system.

```js
// Example using styled-components
import styled from 'styled-component'
import tokens from './tokens'

export const Box = styled.div`
  font-family: ${tokens.get('type.fontFamilyBase')};
  background-color: ${tokens.brand('primary')};
  margin: ${tokens.space(2)} 0;
`
```

## Options

Design System Utils comes with a few options. If you are happy with the default, you may not need to modify them.

```js
// Use default options. do not convert the font-sizes to rems or ems
export default new DesignSystem(myDesignSystem)

// OR: with custom options
export default new DesignSystem(myDesignSystem, {
  shortcuts: {},
  fontSizeUnit: '',
})
```

### Shortcuts

If your tokens object has a different structure, you can remap existing shortcut method _locations_, _names_ or even _create new shortcuts_, (e.g. move the font-size object to the root).

You can also rename existing shortcut methods. This could be useful for non-English speaking languages or you just don't like what I chose originally. Either way, you now have that power.

Renamed shorcuts retain the functionality of the original method.
New, shortcut methods alias to the `.get()` method.

```js
export default new DesignSystem(myDesignSystem, {
  fontSizeUnit: 'rem',
  shortcuts: {
    // remap existing location
    fontSize: 'fontSizes',
    color: 'colors.colorPalette',
    brand: 'colors.brandPalette',
    spacing; 'spacing',

    // rename and remap
    // you still have to provide the location, even if it is the same
    bp: {
      location: 'breakpoints',
      name: 'breakpoint',
    },

    z: {
      location: 'zIndex',
      name: 'zIndex',
    },

    // new shortcuts
    forms: 'forms',
    motion: 'motion',
  }
})
```

### Font Size Unit

```js
// Use default options. do not convert the font-sizes to rems or ems
export default new DesignSystem(myDesignSystem)

// OR: with custom options
export default new DesignSystem(myDesignSystem, {
  // this is used to convert your `type.sizes` values from one unit to another
  // e.g. to convert all `px` sizes  to `rem`, set this option:
  fontSizeUnit: 'rem',
  // this means you can define values using px and use rems in your app
})
```

## Basic API methods

### `tokens.get()` - Get a token value

The `tokens.get()` function can be used to get any value from the design-system. Use object dot notation to find the value you need from your design system object.

```js
// with the system setup, as above
tokens.get('lineHeight.headings') // 1.1
tokens.get('a.really.deeply.nested.value')
```

### `tokens.set()` - Set a token value

The `tokens.set()` function can be used to set tokens values. This means you can overwrite existing items, or create new items that are specific to your application.

Like the `.get()` method, use object dot notation to find the value you need from your design system object.

This method uses [dset](https://github.com/lukeed/dset#usage) under the hood, so please read the docs there for more info.

```js
// with the system setup, as above
tokens.set('forms.inputBackground', '#fff')

// then use it later like so:
tokens.get('forms.inputBackground')
```

## Shortcut methods

The shortcut methods make getting values _much_ more simple. Design System Utils provides a few of the most common

- [`tokens.fontSize()` or `tokens.fs()`](#tokensfontsize-or-tokensfs---get-font-size-values) - Get font-size values
- [`tokens.color()`](#tokenscolor---get-color-palette-values) - Get color palette values
- [`tokens.brand()`](#tokensbrand---get-brand-palette-values) - Get brand palette values
- [`tokens.bp()`](#tokensbp---get-responsive-breakpoint-values) - Get responsive breakpoint values
- [`tokens.z()`](#tokensz---get-z-index-values) - Get `z-index` values
- [`tokens.spacing()` or `tokens.space()`](#tokensspacing-or-tokensspace---get-spacing-values) - Get spacing values

### `tokens.fontSize()` or `tokens.fs()` - Get font-size values

The `tokens.fontSize()` method is a short-hand for the `tokens.get()` method. It can be used to get a value from the `type.sizes` object.

The `type.sizes` object’s values can be formatted in a few ways:

- as a string with any unit of measurement, e.g. `s: '13px'` / `px`, `rem` or `em`
- as a template string using another function to calculate font-sizes, for example a modular-scale, e.g. `${ms(0, modularscale)}px`. **Note: this uses an external package, [modularscale-js](https://github.com/modularscale/modularscale-js)**

```js
// define some values// type.sizes object
sizes: {
  xs: '16px',
  s: '20px',
  base: '30px',
  m: '36px',
  l: '42px',
  xl: '50px',
  xxl: '58px',
},

// retrieve some values
tokens.fontSize('xl')
tokens.fs('xl') // `tokens.fs()` is a short-hand alias for `tokens.fontSize()`
tokens.fs('xl', true) // return font-size in px regardless of `option.fontSizeUnit` value
```

#### Modular scale

**Note: v0.x.x had modular scale functionality built-in, in v1.x.x, this has been removed to reduce file-size for those that don't need a modular scale.**

To make use of a modular scale, there are a few things that need to be done:

- install a modular scale converter package, like [modularscale-js](https://github.com/modularscale/modularscale-js)
- define your modular scale options outside of your design-system object
- add the modular scale values to the `type.sizes` object

```js
const modularscale = {
  base: [30],
  ratio: 1.5,
}

// design system
...
sizes: {
  xs: `${ms(-2, modularscale)}px`,
  s: `${ms(-1, modularscale)}px`,
}
...
```

Testing and remembering the values from your modular scale can be tricky, there are two options that can be used, either:

- visit [modularscale.com](https://modularscale.com) and enter your settings, you can then view all the type sizes on the scale you specified
- or, add the below snippet to your code to print out the values of your scale:

```js
const sizes = tokens.get('type.sizes')
Object.keys(sizes).forEach(item => {
  console.log(item, ':', sizes[item]) // e.g. `base : 20px`
})
```

### Color palette

There are two possible ways to access color information: the color palette and the brand colors.

The color palette is intended to contain all the colors (and their shades) that your app will use, and the brand palette _should_ contain the specific colors that your brand uses.

Two methods can be used to retrieve the values, these are: `tokens.color()` and `tokens.brand()`, below is what the data looks like for them:

```js
colors: {
  // With a color palette like this:
  colorPalette: {
    bright: {
      base: '#F9FAFB',
      dark: '#F4F6F8',
      darker: '#DFE4E8',
    },

    dark: {
      base: '#212B35',
      light: '#454F5B',
      lighter: '#637381',
    },
  },

  // With a brand palette like this:
  brand: {
    red: '#e82219',
    deeporange: '#ff7200',
    orange: '#ff9500',
    green: '#c4d000',
    teal: '#1aa5c8',
    navy: '#0052da',
  }
},
```

#### `tokens.color()` - Get color palette values

The `tokens.color()` function gets values from the `colorPalette` object. It assumes every color has a `base` property and other properties for different shades of the same color.
This is a short-hand for the `tokens.get()` function.

```js
// Get values like this:
tokens.color('bright') // #F9FAFB - the `base` key is the default, so it is not needed
tokens.color('bright', 'dark')
tokens.color('background.extra.dark') // Accepts a path (in this case the second `variant` argument is ignored)
```

#### `tokens.brand()` - Get brand palette values

The `tokens.brand()` function gets values from the `colors.brand` object.
This is a short-hand for the `tokens.get()` function.

```js
// Get brand values like this:
tokens.brand('orange')
tokens.brand('pink')
tokens.brand('primary.blue') // it is possible to nest this object as much as you like
```

### `tokens.bp()` - Get responsive breakpoint values

The `tokens.bp()` method is a short-hand for the `tokens.get()` method. It can be used to get a breakpoint from the `breakpoints` object.

```js
tokens.bp('m')
```

### `tokens.z()` - Get `z-index` values

The `tokens.z()` method is a short-hand for the `tokens.get()` method. It can be used to get a breakpoint from the `zIndex` object.

```js
tokens.z('low')
```

### `tokens.spacing()` or `tokens.space()` - Get spacing values

The `tokens.spacing()` method returns a value from your `spacing.scale` definition. **The spacing data could either be an array, or an object.**

- If an array, it takes an `index` (number) for that array e.g. `tokens.space(2)`. This variant adds `px` to the end of the string, this will be deprecated in v2.0.0.
- If an object, it takes a `key` (string) for the item in that object e.g. `tokens.space('m')`

#### Array example:

```js
scale: [0, 8, 16, 24, 32, 40]

tokens.spacing(2) // '16px'
// Note: `tokens.space(2)` can also be used
```

#### Object example:

```js
scale: {
  s: '10rem',
  m: '100rem',
  l: '1000rem',
}

tokens.spacing('m') // '100rem'
// Note: `tokens.space('m')` can also be used
```

### Calculations

The framework currently provides a few calculation functions, `multiply`, `toPx` and `pxTo`:

#### `tokens.multiply()`

```js
tokens.multiply(10, 2) // 20

// you can pass in another value from the system
tokens.multiply(tokens.get('spacing.baseline'), 2)

// or just use the key from the system
// the initial value will always be run through `parseFloat()`
tokens.multiply('spacing.baseline', 2)
```

#### `pxTo()`

Converts `px` to `rem` or `em`

```js
import { pxTo } from 'design-system-utils'
// pxTo(fontSize, baseFontSize, unit - 'rem'/'em')
pxTo(12, 20, 'rem') // 0.6rem
pxTo(12, 20, 'em') // 0.6em
```

#### `toPx()`

Converts `rem` or `em` value to `px`

```js
import { toPx } from 'design-system-utils'
// toPx(fontSize, baseFontSize)
toPx('1.875rem', 16) // 30px
toPx('1.875em', 16) // 30px
```

#### `parseUnit()`

Parses a number and unit string, and returns the unit used

```js
import { parseUnit } from 'design-system-utils'
parseUnit('1.875rem') // 'rem'
parseUnit('18px') // 'px'
```

## Usage with Typescript

Typescript types and interfaces should be imported as named imports.

See all the type definitions in the [types.ts](https://github.com/mrmartineau/design-system-utils/blob/master/src/types.ts) file. Here are all the exported types that can be extended:

```
{
  System,
  SystemOptions,
  SystemBreakpoints,
  SystemZIndex,
  SystemFontSizes,
  SystemSpacing,
  SystemScale,
  SystemColorPalette,
  SystemBrandPalette,
  SystemType,
  SystemOptionalKey,
}
```

Below is an example where a new item (`baseline`) is added to the `spacing` object.

```ts
import DesignSystem, { System, SystemOptions, SystemSpacing } from '../index'

interface MySystemSpacing extends SystemSpacing {
  baseline: number
}

interface MySystem extends System {
  spacing: MySystemSpacing
}

const Tokens: MySystem = {
  ...
  ...

  spacing: {
    scale: [0, 8, 16, 24, 32, 40],
    baseline: 20,
  },
}

export default new DesignSystem<MySystem, SystemOptions>(Tokens)
```

## Demo & examples

I created a demo on [codesandbox.io](https://codesandbox.io/s/6wrp94x7kk), it includes examples of using the design-system utils with [emotion](https://emotion.sh/), [styled-components](https://www.styled-components.com/) and [glamorous](https://glamorous.rocks). There is also a basic example [here](example/).

## Licence

MIT &copy; [Zander Martineau](https://zander.wtf)
