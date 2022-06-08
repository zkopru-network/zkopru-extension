import { styled } from '@linaria/react'

export const Input = styled.input<{ error?: boolean }>`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${({ error }) => (error ? '#ff4949' : '#9b9b9b')};
  font-size: 16px;
`
