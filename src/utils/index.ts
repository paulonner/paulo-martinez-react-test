export const saveSession = ({ email }: { email: string }) => {
  localStorage.setItem('session', JSON.stringify({
    email
  }))
}

export const getSession = () => {
  const session = localStorage.getItem('session')
  return session ? JSON.parse(session) : null
}

export const removeSession = () => {
  localStorage.removeItem('session')
}