import { ReactNode } from 'react'
import { Noop, RefCallBack } from 'react-hook-form'

/**
 * Themes for the extension
 * @export
 * @interface Theme
 */
export interface Theme {
  'sanctum-light': string
  'sanctum-dark': string
}

// INPUT INTERFACES
/**
 * Props for inputs that are not submit buttons.
 * @export
 * @interface GenericProps
 * @extends {React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>}
 */
export interface GenericInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  /**
   * The button label
   * @type {string}
   * @memberof SubmitProps
   */
  label: string
  /**
   * Error message to display
   * @type {string}
   * @memberof SubmitProps
   */
  error?: string
  /**
   * Possible input types that are not submit buttons
   * @type {('text' | 'password' | 'number')}
   * @memberof GenericProps
   */
  type: 'text' | 'password' | 'number'
  /**
   * Used on submit inputs to define button styles
   * @type {string}
   * @memberof GenericProps
   */
  as?: string
  /**
   * The id of the input
   * @type {string}
   * @memberof SubmitProps
   */
  id: string
  /**
   * Extends the Tailwind classes of the button
   * @type {string}
   * @memberof SubmitProps
   */
  extendClasses?: string
}
/**
 *  Props specific to submit buttons.
 * @export
 * @interface SubmitProps
 * @extends {React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>}
 */
export interface SubmitProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  /**
   * The button label
   * @type {string}
   * @memberof SubmitProps
   */
  label: string
  /**
   * Error message to display
   * @type {string}
   * @memberof SubmitProps
   */
  error?: string
  /**
   * @type {'submit'}
   * @memberof SubmitProps
   */
  type: 'submit'
  /**
   * The type of button to render.
   * @type {('ghost' | 'filled')}
   * @memberof SubmitProps
   */
  as: 'ghost' | 'filled'
  /**
   * The id of the button
   * @type {string}
   * @memberof SubmitProps
   */
  id: string
  /**
   * Extends the Tailwind classes of the button
   * @type {string}
   * @memberof SubmitProps
   */
  extendClasses?: string
}

export type InputProps = GenericInputProps | SubmitProps

// BUTTON INTERFACES
export interface BtnProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode
  variant: keyof BtnVariants | keyof RoundedBtnVariants
  icon?: JSX.Element
}

export interface BtnVariants {
  filled: string
  ghost: string
}

export interface RoundedBtnVariants {
  /**
   *The larger rounded button
   *
   * @type {string}
   * @memberof RoundedBtnVariants
   */
  primary: string
  /**
   *A smaller rounded button
   *
   * @type {string}
   * @memberof RoundedBtnVariants
   */
  secondary: string
}

export interface TokenData {
  id: number
  name: string
  symbol: string
  icon: string
}

export interface TokenSelectorProps {
  /**
   * The onChange callback for `Controller`
   *
   * @memberof TokenSelectorProps
   */
  onChange: (...event: any[]) => void
  /**
   * The onBlur callback for `Controller`
   *
   * @memberof TokenSelectorProps
   */
  onBlur: Noop
  /**
   * The value to send back to `Controller`
   *
   * @memberof TokenSelectorProps
   */
  value: string
  inputRef?: RefCallBack
  /**
   * The identifier to associate with `Controller`
   *
   * @memberof TokenSelectorProps
   */
  name: string
  data: TokenData[]
}

export interface NetworkProps {
  label: string
  chainId: number
}

export interface NetworkSwitcherProps {
  networks?: NetworkProps[]
  onNetworkChange?: (chainId: number) => void
}
