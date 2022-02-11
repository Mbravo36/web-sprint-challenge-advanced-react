// Write your tests here
import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import AppClass from './AppClass';
import AppFunctional from './AppFunctional';


test('sanity', () => {
  expect(true).toBe(true)
})


test('class component renders without errors', () => {
  render(<AppClass className="class-based" />)
})

test('visible text is actually visable', () => {
  render(<AppClass className="class-based" />)
    screen.findByText('Welcome to the GRID')
    screen.findByText('Functional')
    screen.findByText('Class-Based')

    screen.findByText('LEFT')
    screen.findByText('RIGHT')
    screen.findByText('UP')
    screen.findByText('DOWN')
    screen.findByText('reset')
})
test('invisible message div is in the document', () => {
  render(<AppClass className="class-based" />)
    const messageDiv = document.querySelector('#message')
    expect(messageDiv).toBeInTheDocument();
})

test('typing in input results in value changing', () => {
  render(<AppClass className="class-based" />)
  const formInput = document.querySelector('input')
  expect(formInput).toBeInTheDocument();

  fireEvent.change(formInput, {
    target: {
      value: 'lady@gaga.com'
    }
  })

  screen.findByText('lady@gaga.com')
})

test('clicking up button changes coordinates to (2, 1)', () => {
  render(<AppClass className="class-based" />)
  const upButton = document.querySelector('#up')
  expect(upButton).toBeInTheDocument();

  screen.queryByText('Coordinates (2,2)')

  fireEvent.click(upButton)

  screen.queryByText('Coordinates (2,1)')
})
test('functional component renders without errors', () => {
  render( <AppFunctional className="functional" />)
})

test('visible text is actually visable', () => {
  render( <AppFunctional className="functional" />)
    screen.findByText('Welcome to the GRID')
    screen.findByText('Functional')
    screen.findByText('Class-Based')

    screen.findByText('LEFT')
    screen.findByText('RIGHT')
    screen.findByText('UP')
    screen.findByText('DOWN')
    screen.findByText('reset')
})
test('invisible message div is in the document', () => {
  render( <AppFunctional className="functional" />)
    const messageDiv = document.querySelector('#message')
    expect(messageDiv).toBeInTheDocument();
})

test('typing in input results in value changing', () => {
  render( <AppFunctional className="functional" />)
  const formInput = document.querySelector('input')
  expect(formInput).toBeInTheDocument();

  fireEvent.change(formInput, {
    target: {
      value: 'lady@gaga.com'
    }
  })

  screen.findByText('lady@gaga.com')
})

test('clicking up button changes coordinates to (2, 1)', () => {
  render( <AppFunctional className="functional" />)
  const upButton = document.querySelector('#up')
  expect(upButton).toBeInTheDocument();

  screen.queryByText('Coordinates (2,2)')

  fireEvent.click(upButton)

  screen.queryByText('Coordinates (2,1)')
})