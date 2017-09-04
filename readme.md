<h1 align="center">
  design-system-utils

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

## Usage
Create your design system file, this contains all your global variables that your app will use, think font-sizes, color palette etc.

## Setup your design system
This is an excerpt from the example design-system. See a more complete example in the [example](example/myDesignSystem.js) directory.

```js
export const myDesignSystem = {
  settings: {
    useModularScale: true,
  },

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
export const ds = new DesignSystem(myDesignSystem)
```

## Import the design system into your component file
```js
import { ds } from './myDesignSystem'
```

## Get some values
The `ds.getValue()` function can be used to get any value from the design-system. Use dot notation to find the value you need.
```js
// with the system setup, as above
ds.getValue('type.baseFontSize') // 20px
```

I have provided a few other helper methods to make finding certain values more simple.
### Get font-sizes
The `ds.getFontSize()` method is a short-hand for the `ds.getValue()` method. It can be used to get a breakpoint from the `type.sizes` object.
```js
ds.getFontSize('xl') // 45 - we are using modular-scale to calculate sizes
```

### Color palette
The `ds.getColor()` function gets values from the `colorPalette` object. It assumes every color has a `base` property and other properties for different shades of the same color.
This is a short-hand for the `ds.getValue()` function.
```js
// With a color palette like this:
const colorPalette = {
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
}

// Get values like this:
ds.getColor('bright') // #F9FAFB - the `base` key is the default, so it is not needed
ds.getColor('bright', 'dark')
```

### Responsive Breakpoints
The `ds.getBreakpoint()` method is a short-hand for the `ds.getValue()` method. It can be used to get a breakpoint from the `breakpoints` object.
```js
ds.getBreakpoint('m')
```

### `z-index`
The `ds.getZIndex()` method is a short-hand for the `ds.getValue()` method. It can be used to get a breakpoint from the `zIndex` object.
```js
ds.getZIndex('low')
```

### Calculations
The framework currently provides a few calculation functions, `multiply` and `pxTo`:

#### `multiply`
```js
ds.multiply(10, 2) // 20
ds.multiply(ds.getValue('spacing.baseline'), 2)
```

#### `pxTo`
Converts `px` to `rem` or `em
```js
ds.pxTo(12, 20, 'rem') // 0.6rem
ds.pxTo(12, 20, 'em') // 0.6em
```

## Demo & examples
I created a demo on [codesandbox.io](https://codesandbox.io/s/qkloonj87w), it includes examples of using the design-system utils with [emotion](https://emotion.sh/), [styled-components](https://www.styled-components.com/) and [glamorous](https://glamorous.rocks). There is also a basic example [here](example/).

> Made by [ZΛNDΞR :zap:](https://github.com/mrmartineau/)



