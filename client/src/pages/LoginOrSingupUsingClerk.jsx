import React from 'react'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'


const LoginOrSingupUsingClerk = () => {
  return (
    <>
      <header>
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </>
  )
}

export default LoginOrSingupUsingClerk
