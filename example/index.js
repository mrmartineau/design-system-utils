import React from 'react'
import { render } from 'react-dom'

// import the design-system
import { ds } from './myDesignSystem'

// We can use styled-components or glamorous
import styled from 'styled-components'
import glamorous from 'glamorous'

// Create some components
const StyledHeading = styled.h2`
  color: ${ds.getColor('dark')};
  font-size: ${ds.getFontSize('l')};
  font-family: ${ds.getValue('type.fontFamily.system')};
`

const StyledButton = styled.button`
  background-color: ${ds.getColor('secondary')};
  border: 0;
  border-radius: ${ds.getValue('borderRadius')};
  padding: ${ds.getValue('spacing.padding')};
  color: ${ds.getColor('bright')};
  font-size: ${ds.getFontSize('l')};
  &:hover {
		background-color: ${ds.getColor('secondary', 'dark')};

	}
`

const GlamorousHeading = glamorous.h2({
  color: ds.getColor('dark'),
  fontSize: ds.getFontSize('l'),
  fontFamily: ds.getValue('type.fontFamily.system'),
})

const GlamorousButton = glamorous.button({
  backgroundColor: ds.getColor('primary'),
  border: 0,
  borderRadius: ds.getValue('borderRadius'),
  padding: ds.getValue('spacing.padding'),
  color: ds.getColor('bright'),
  fontSize: ds.getFontSize('l'),
  ':hover': {
    backgroundColor: ds.getColor('primary', 'light'),
  },
})

const App = () =>
  <div>
    <StyledHeading>With Styled Components</StyledHeading>
    <StyledButton>Please click me</StyledButton>
    <br />
    <GlamorousHeading>With Glamorous</GlamorousHeading>
    <GlamorousButton>Please click me</GlamorousButton>
  </div>

render(<App />, document.getElementById('root'))
