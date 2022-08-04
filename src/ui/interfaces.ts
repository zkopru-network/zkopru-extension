/**
 * Themes for the extension
 * @export
 * @interface Theme
 */
export interface Theme {
  'sanctum-light': string
  'sanctum-dark': string
}

/**
 * Props for inputs that are not submit buttons.
 * @export
 * @interface GenericProps
 * @extends {React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>}
 */
export interface GenericProps
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

export type InputProps = GenericProps | SubmitProps
