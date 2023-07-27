import { useState, type ReactNode, type FormEvent } from 'react'
import { GithubOutlined } from '@ant-design/icons'
import '../../style/subscribe/SubscribePage.sass'

enum InputState {
  idle,
  valid,
  inValid,
  serverWaiting,
  serverError,
}

export const SubscribePage = (): ReactNode => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [text, setText] = useState('')
  const [inputState, setInputState] = useState(InputState.valid)

  let color = '#ffffff'

  switch (inputState) {
    case InputState.idle:
      color = '#ffffff'
      break
    case InputState.valid:
      color = '#388F62'
      break
    case InputState.inValid:
      color = '#A04E4E'
      break
    case InputState.serverWaiting:
      color = 'white'
      break
    case InputState.serverError:
      color = 'red'
      break
  }

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value
    setText(value)
    if (e.currentTarget.value === '') {
      setInputState(InputState.idle)
      return
    }
    const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    if (isValidEmail.test(value)) {
      setInputState(InputState.valid)
    } else {
      setInputState(InputState.inValid)
    }
  }

  const onClick = (): void => {
    // email logic
    console.log('onclick')
  }

  return (
    <div className="subscribe__section">
      <div className="title">Subscribe</div>
      <div className="textinput" style={{ borderColor: color }}>
        <input
          onChange={onChange}
          type="text"
          value={text}
          placeholder="Type your email"
        />
        <button onClick={onClick} style={{ borderColor: color }}>
          Subscribe
        </button>
      </div>
      <div className="subtitle">or follow social media</div>
      <div className="icon__container">
        <a
          className="icon"
          href="https://github.com/stnuc/seminar"
          target="_blank"
          rel="noreferrer"
        >
          <GithubOutlined style={{ fontSize: '40px', color: '#ffffff' }} />
        </a>
      </div>
    </div>
  )
}
