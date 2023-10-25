import { Link } from 'react-router-dom'

export const Landing = () => {
  return (
    <div>
        <nav>
        <ul className='flex gap-8'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
