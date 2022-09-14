import { css } from '@linaria/core'

export const globalStyle = css`
  :global() {
    body {
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      margin: 0;
      min-width: 100vw;
      background-color: #eeedff;
    }
    input {
      appearance: textfield;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input:invalid {
      box-shadow: none;
    }
    input:focus {
      outline: none;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    * {
      box-sizing: border-box;
    }
  }
`
