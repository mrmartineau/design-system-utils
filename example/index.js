import React from 'react'
import { render } from 'react-dom'

// import the design-system
import ds from './myDesignSystem'

// We can use styled-components or glamorous
import glamorous from 'glamorous'
import styled from 'react-emotion'

// Create some components

const EmotionHeading = styled('h2')`
  color: ${ds.color('dark')};
  font-size: ${ds.fontSize('l')};
  font-family: ${ds.get('type.fontFamily.system')};
`

const EmotionButton = styled('button')`
  background-color: ${ds.color('secondary')};
  border: 0;
  border-radius: ${ds.get('borderRadius')};
  padding: ${ds.get('spacing.padding')};
  color: ${ds.color('bright')};
  font-size: ${ds.fontSize('l')};
  &:hover {
    background-color: ${ds.color('secondary', 'dark')};
  }
`

const GlamorousHeading = glamorous.h2({
  color: ds.color('dark'),
  fontSize: ds.fontSize('l'),
  fontFamily: ds.get('type.fontFamily.system'),
})

const GlamorousButton = glamorous.button({
  backgroundColor: ds.color('primary'),
  border: 0,
  borderRadius: ds.get('borderRadius'),
  padding: ds.get('spacing.padding'),
  color: ds.color('bright'),
  fontSize: ds.fontSize('l'),
  ':hover': {
    backgroundColor: ds.color('primary', 'light'),
  },
})

const App = () => (
  <div>
    <EmotionHeading>With Styled Components</EmotionHeading>
    <EmotionButton>Please click me</EmotionButton>
    <br />
    <GlamorousHeading>With Glamorous</GlamorousHeading>
    <GlamorousButton>Please click me</GlamorousButton>
  </div>
)

render(<App />, document.getElementById('root'))
