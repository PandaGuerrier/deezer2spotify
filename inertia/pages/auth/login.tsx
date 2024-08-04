import { Head } from '@inertiajs/react'
import MainLayout from '~/layouts/MainLayout'
import InputFD from '~/components/Input'
import ButtonFD from '~/components/Button'

export default function Login() {
  return (
    <MainLayout>
      <Head title="Login" />

      <div className="container">
        <div className="title">Login</div>

        <form method="post" action="/auth/login" className="form">
          <InputFD
            label="Email"
            required
            type="email"
            name="email"
            onChange={(e) => console.log(e.target.value)}
          />

          <InputFD
            label="Password"
            required
            type="password"
            name="password"
            onChange={(e) => console.log(e.target.value)}
          />

          <ButtonFD type="submit" name="Login" />
        </form>
      </div>
    </MainLayout>
  )
}
