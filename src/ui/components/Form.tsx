import { styled } from '@linaria/react'

export const Input = styled.input<{ error?: boolean }>`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${({ error }) => (error ? '#ff4949' : '#9b9b9b')};
  font-size: 16px;
`

export const Label = styled.label`
  text-transform: capitalize;
  font-weight: 600;
`

export const FieldControl = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
`

export const ErrorMessage = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  color: #ff523b;
`
