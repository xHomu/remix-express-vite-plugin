import morgan from 'morgan'
import { createExpressApp } from 'remix-create-express-app'
import { sayHello } from './hello.server'
import { AppLoadContext } from '@remix-run/node'
import compression from 'compression'
import next from 'next'

// Initiate Next Handler
const nextApp = next({ dev: true })
const handle = nextApp.getRequestHandler()
await nextApp.prepare()

// @ts-expect-error - This is a valid import
function nextHandler(req, res) {
  return handle(req, res)
}

// This creates an express server that runs inside vite
export const app = createExpressApp({
  configure: app => {
    // customize your express app with additional middleware
    app.use(compression())
    app.disable('x-powered-by')
    app.use(morgan('tiny'))

    // Finally, we need to tell our server to pass any other request to Next
    // so it can keep working as an expected
    app.all('/admin*', nextHandler)
    app.all('/api*', nextHandler)
    app.all('/my-route', nextHandler)
    app.all('/_next/*', nextHandler)
  },
  getLoadContext: () => {
    // return the AppLoadContext
    return { sayHello } as AppLoadContext
  },
  unstable_middleware: true,
})
