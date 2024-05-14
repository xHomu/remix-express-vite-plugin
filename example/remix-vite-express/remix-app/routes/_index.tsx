import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export const loader = async ({
  context: { payload, user },
}: LoaderFunctionArgs) => {
  console.log({ user })
  const users = await payload.find({
    collection: 'users',
  })

  return { userCount: users?.totalDocs }
}

export default function Index() {
  const { userCount } = useLoaderData<typeof loader>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1 className="text-blue-500">Welcome to Remix</h1>
      <p>Users: {userCount}</p>
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
          <Link to="/api/users" reloadDocument>
            This is a Payload API Route Proxy
          </Link>
        </li>
        <li>
          <Link to="/admin/login" reloadDocument>
            This is a Payload Admin Route Proxy
          </Link>
        </li>
      </ul>
    </div>
  )
}
