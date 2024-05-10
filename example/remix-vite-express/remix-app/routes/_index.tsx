import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export const loader = async ({
  context: { payload, user },
}: LoaderFunctionArgs) => {
  console.log(payload)
  const users = await payload.find({
    collection: 'users',
  })

  console.log({ user })

  return { userCount: users.totalDocs }
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1 className="text-blue-500">Welcome to Remix</h1>
      <ul>
        <li>
          <Link to="/test">Test</Link>
        </li>
        <li>
          <Link to="/test-redirect">Test Redirect</Link>
        </li>
        <li>
          <Link to="/test-error">Test Error</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <a href="/my-route">This is a Next Route</a>
        </li>
        <li>
          <a href="/admin">This is a Next Admin Route</a>
        </li>
        <li>
          <a href="/api/users">This is a Next API Route</a>
        </li>
      </ul>
    </div>
  )
}
