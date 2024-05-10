import Link from 'next/link'

const Page = () => {
  return (
    <article className={['container'].filter(Boolean).join(' ')}>
      <h1>
        Payload 3.0 <span className="rainbow">ALPHA</span>!
      </h1>
      <p>This alpha is rapidly evolving, you can report any bugs against .</p>

      <p>
        <strong>
          Payload is running at <Link href="/admin">/admin</Link>
        </strong>
      </p>

      <p>contains an example of a custom route running the Local API.</p>

      <p>You can use the Local API in your server components like this:</p>
      <pre>
        <code>
          {`import { getPayload } from 'payload'
import configPromise from "@payload-config";
const payload = await getPayload({ config: configPromise })

const data = await payload.find({
  collection: 'posts',
})`}
        </code>
      </pre>
    </article>
  )
}

export default Page
