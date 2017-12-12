<h1 align="center">
  design-system-utils

  [![npm](https://img.shields.io/npm/v/design-system-utils.svg?style=flat-square)](https://www.npmjs.com/package/design-system-utils)
  [![Travis CI Build](https://img.shields.io/travis/mrmartineau/design-system-utils.svg?style=flat-square)](https://travis-ci.org/mrmartineau/design-system-utils)
  [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
  ![](https://img.shields.io/badge/licence-MIT-blue.svg?style=flat-square)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
</h1>

> Design system framework for modern front-end projects

Maintaining styling consistency in a web app is always tough. This micro framework aims to standardise your design-system and provide helpful utilities to access it's information.

## Install
```sh
npm i --save design-system-utils

yarn add design-system-utils
```

### Size
Package size: **1.08 KB** minified and gzipped

## Usage
Create your design system file, this contains all your global variables that your app will use, think font-sizes, color palette etc.

## Setup your design system
Below are the mandatory items that your design system should use. Beyond these, you can add anything you like.
```js
{
  type: {
    // this should be set as a px value if you have `options.fontSizeUnit` set
    // to 'rem' or 'em' so that the lib can convert the values properly
    baseFontSize: <string>,

    sizes: {
      key: <number | string>,
    },

    // If you're using a modular scale, set it up here
    // Use these docs to find out more: https://github.com/modularscale/modularscale-js
    modularscale: {
      base: <number | array>,  // should be the same as baseFontSize
      ratio: <number>,
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
        base: <string>, // base is the default
      },
    },

    // Used with `ds.brand('colorName)`
    brand: {
      colorName: <string>, // base is the default
    }
  },

  // Breakpoints
  // Used with `ds.bp()`
  // Keys can be anything you like
  // Have as many breakpoints as you like
  // Values can be use any unit you like
  breakpoints: {
    key: <number | string>,
  },

  // Z-index
  // Used with `ds.z()`
  zIndex: {
    key: <number>
  },

  // Spacing
  // Used with `ds.spacing()` or `ds.space()`
  spacing: {
    scale: <array>[<number | string>, ...],
  },
}
```

This is an excerpt from the example design-system. See a more complete example in the [example](example/myDesignSystem.js) directory.
```js
export const myDesignSystem = {
  type: {
    baseFontSize: '20px',

    // the values below use modular-scale
    sizes: {
      xs: -2,
      s: -1,
      base: 0, // [default] p, h5, h6
      m: 1, // h4
      l: 2, // h3
      xl: 3, // h2
      xxl: 4, // h1
    },

    modularscale: {
      base: 20,
      ratio: 1.5,
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

## Initialise the design system framework
```js
// myDesignSystem.js
import DesignSystem from 'design-system'
export const myDesignSystem {...} // your design-system goes here
export const ds = new DesignSystem(myDesignSystem, {
  useModularScale: true,
  fontSizeUnit: 'rem',
})
```

## Import the design system into your component file
```js
import { ds } from './myDesignSystem'
```

## Get some values
The `ds.get()` function can be used to get any value from the design-system. Use dot notation to find the value you need.
```js
// with the system setup, as above
ds.get('lineHeight.headings') // 1.1
```

I have provided a few other helper methods to make finding certain values more simple.
### Get font-sizes
The `ds.fontSize()` method is a short-hand for the `ds.get()` method. It can be used to get a breakpoint from the `type.sizes` object.
```js
ds.fontSize('xl')
ds.fs('xl') // `fs()` is a short-hand alias for `fontSize()`
ds.fs('xl', true) // return font-size in px regardless of `option.fontSizeUnit` value
ds.fs(6) // returns font-size of the 6th item on the modular-scale. This will only work if the òptions.modularscale` is `true`
```

### Color palette
There are two possible ways to access color information: the color palette and the brand colors. The color palette is intended to contain all the colors (and their shades) that your app will use, and the brand palette is the specific colors that your brand uses. Two methods can be used to retrieve the values, these are:

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

#### Get color palette value
The `ds.color()` function gets values from the `colorPalette` object. It assumes every color has a `base` property and other properties for different shades of the same color.
This is a short-hand for the `ds.get()` function.

```js
// Get values like this:
ds.color('bright') // #F9FAFB - the `base` key is the default, so it is not needed
ds.color('bright', 'dark')
```

#### Get brand palette value
The `ds.brand()` function gets values from the `colors.brand` object.
This is a short-hand for the `ds.get()` function.
```js
// Get brand values like this:
ds.brand('orange')
ds.brand('pink')
ds.brand('primary.blue') // it is possible to nest this object as much as you like
```

### Responsive Breakpoints
The `ds.bp()` method is a short-hand for the `ds.get()` method. It can be used to get a breakpoint from the `breakpoints` object.
```js
ds.bp('m')
```

### `z-index`
The `ds.z()` method is a short-hand for the `ds.get()` method. It can be used to get a breakpoint from the `zIndex` object.
```js
ds.z('low')
```

### Spacing
The `ds.spacing()` method returns a value from your `spacing.scale` array. It takes an index for that array and converts the value to pixels.
```js
// Example scale array
// scale: [0, 8, 16, 24, 32, 40]

ds.spacing(2) // '16px'
```
Note: `ds.space(2)` can also be used.

### Calculations
The framework currently provides a few calculation functions, `multiply` and `pxTo`:

#### `multiply`
```js
ds.multiply(10, 2) // 20

// you can pass in another value from the system
ds.multiply(ds.get('spacing.baseline'), 2)

// or just use the key from the system
// the initial value will always be run through `parseFloat()`
ds.multiply('spacing.baseline', 2)
```

#### `pxTo`
Converts `px` to `rem` or `em`
```js
// ds.pxTo(fontSize, baseFontSize, unit)
ds.pxTo(12, 20, 'rem') // 0.6rem
ds.pxTo(12, 20, 'em') // 0.6em
```

#### `toPx`
Converts `rem` or `em` value to `px`
```js
ds.toPx('1.875rem', 16) // 30px
ds.toPx('1.875em', 16) // 30px
```

## Demo & examples
I created a demo on [codesandbox.io](https://codesandbox.io/s/91kjlxnm0p), it includes examples of using the design-system utils with [emotion](https://emotion.sh/), [styled-components](https://www.styled-components.com/) and [glamorous](https://glamorous.rocks). There is also a basic example [here](example/).

> Made by [ZΛNDΞR :zap:](https://github.com/mrmartineau/)
