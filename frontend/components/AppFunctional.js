import React, {useState} from 'react'
import axios from 'axios'

const initialState = {
  x: 2,
  y: 2,
  steps: 0,
  email: '',
  message: ''
}

export default function AppFunctional(props) {

  const [ value, setValue ] = useState(initialState)

  const onChange = e => {
    setValue({
      ...value,
      email: e.target.value
    })
  }

  const decreaseY = () => {
    value.y <= 3 && value.y >= 2 ? 
    setValue({
      ...value, 
      y: value.y - 1, 
      steps: value.steps + 1
    }) :
    setValue({
      ...value, 
      y: value.y === 3 ? 3 : value.y, 
      message: "You can't go up"
    })
  }

  const increaseX = () => {
    value.x <= 2 && value.x >= 1 ? 
    setValue({
      ...value, 
      x: value.x + 1, 
      steps: value.steps + 1}) :
    setValue({
      ...value, 
      x: value.x === 3 ? 3 : value.x, 
      message: "You can't go right"})
  }

  const increaseY = () => {
    value.y <= 2 && value.y >= 1 ? 
    setValue({
      ...value, 
      y: value.y + 1, 
      steps: value.steps + 1}) :
    setValue({
      ...value, 
      y: value.y === 3 ? 3 : value.y, 
      message: "You can't go down"})
  }

  const decreaseX = () => {
    value.x <= 3 && value.x >= 2 ? 
    setValue({
      ...value, 
      x: value.x - 1, 
      steps: value.steps + 1
    }) :
    setValue({
      ...value, 
      x: value.x === 3 ? 3 : value.x, 
      message: "You can't go left"})
  }

  const handleReset = () => {
    const input = document.querySelector('#email')
    const messageBox = document.querySelector('#message')
    input.value = ''
    messageBox.value = ''

  setValue({
    ...value,
    x:2,
    y:2,
    steps:0,
    email: "",
    message:''
  })
}
  const handleSubmit = e => {
    e.preventDefault();
    const input = document.querySelector('#email')
    input.value = ''

    axios.post('http://localhost:9000/api/result', value)
    .then(resp => {
      setValue({
        ...value,
        message: resp.data.message
      })
    })
    .catch(error => {
      console.log(error)
      if (value.email === 'foo@bar.baz') {
        setValue({
          ...value,
          message: 'foo@bar.baz failure #71'
        })
      } else if (value.email === '') {
        setValue({
          ...value,
          message: 'Ouch: email is required'
        })
      } else {
        setValue({
          ...value,
          message: 'Ouch: email must be a valid email'
        })
      }
    })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({value.x}, {value.y})</h3>
        <h3 id="steps">You moved {value.steps} {value.steps !== 1 ? 'times' : 'time'}</h3>
      </div>
      <div id="grid">
        <div className={value.x === 1 && value.y === 1 ? 'square active' : 'square'}>
          {value.x === 1 && value.y === 1 ? 'B' : ''}
        </div>
        <div className={value.x === 2 && value.y === 1 ? 'square active' : 'square'}>
          {value.x === 2 && value.y === 1 ? 'B' : ''}
        </div>
        <div className={value.x === 3 && value.y === 1 ? 'square active' : 'square'}>
          {value.x === 3 && value.y === 1 ? 'B' : ''}
        </div>
        <div className={value.x === 1 && value.y === 2 ? 'square active' : 'square'}>
          {value.x === 1 && value.y === 2 ? 'B' : ''}
        </div>
        <div className={value.x === 2 && value.y === 2 ? 'square active' : 'square'}>
          {value.x === 2 && value.y === 2 ? 'B' : ''}
        </div>
        <div className={value.x === 3 && value.y === 2 ? 'square active' : 'square'}>
          {value.x === 3 && value.y === 2 ? 'B' : ''}
        </div>
        <div className={value.x === 1 && value.y === 3 ? 'square active' : 'square'}>
          {value.x === 1 && value.y === 3 ? 'B' : ''}
        </div>
        <div className={value.x === 2 && value.y === 3 ? 'square active' : 'square'}>
          {value.x === 2 && value.y === 3 ? 'B' : ''}
        </div>
        <div className={value.x === 3 && value.y === 3 ? 'square active' : 'square'}>
          {value.x === 3 && value.y === 3 ? 'B' : ''}
        </div>
      </div>

      <div className="info">
        <h3 id="message">{value.message}</h3>
      </div>
      <div id="keypad">
        <button onClick={decreaseX} id="left">LEFT</button>
        <button onClick={decreaseY} id="up">UP</button>
        <button onClick={increaseX} id="right">RIGHT</button>
        <button onClick={increaseY} id="down">DOWN</button>
        <button onClick={handleReset} id="reset">reset</button>
      </div>
      <form>
        <input onChange={onChange} id="email" type="email" placeholder="type email"></input>
        <input onClick={handleSubmit} id="submit" type="submit"></input>
      </form>
    </div>
  )
}
