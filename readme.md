<h1 align="center">
  design-system

  [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
  ![](https://img.shields.io/badge/licence-MIT-blue.svg?style=flat-square)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
</h1>

> Design system framework for modern front-end projects

Maintaining styling consistency in a web app is always tough. This micro framework aims to standardise your design-system and provide helpful utilities to access it's information.

Maintained by [Zander Martineau](https://github.com/mrmartineau)

## Install
```sh
npm i --save design-system

yarn add design-system
```

## Usage
Create your design system file, this contains all your global variables that your app will use, think font-sizes, color palette etc.

### Setup your design system
This is an excerpt from the example directory

```js
const myDesignSystem = {
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

    // font-family-base: ko-font(system),
    // font-family-headings: ko-font(serif),
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
import DesignSystem from 'design-system'
import myDesignSystem from './myDesignSystem' // this is just an plain old javascript object

export const ds = new DesignSystem(myDesignSystem)
```

### Get some values

```js
// with the system setup, as above
ds.getFontSize('xl') // 45 - we are using modular-scale to calculate sizes
ds.getValue('type.baseFontSize')
```

#### Color palette
The color palette needs
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
ds.getColor('primary') // the `base` key is the default, so it is not needed
ds.getColor('primary', 'dark')
```

#### Responsive Breakpoints
This is a short-hand for the `ds.getValue()` function
```js
ds.getBreakpoint('m')
```

#### Responsive Breakpoints
This is a short-hand for the `ds.getValue()` function
```js
ds.getBreakpoint('m')
```

#### `z-index`
This is a short-hand for the `ds.getValue()` function
```js
ds.getZIndex('low')
```

#### Calculations
The framework currently provides a few calculation function, `multiply` and `pxTo`:

##### `multiply`
```js
ds.multiply(10, 2)
ds.multiply(ds.getValue('spacing.baseline'), 2)
```

##### `pxTo`
```js
ds.pxTo(12, 20, 'rem') // 0.6rem
```




