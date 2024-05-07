import morgan from 'morgan'
import { createExpressApp } from 'remix-create-express-app'
import { sayHello } from './hello.server'
import { AppLoadContext } from '@remix-run/node'
import compression from 'compression'

// This creates an express server that runs inside vite
export const app = createExpressApp({
  configure: app => {
    // customize your express app with additional middleware
    app.use(compression())
    app.disable('x-powered-by')
    app.use(morgan('tiny'))
  },
  getLoadContext: () => {
    // return the AppLoadContext
    return { sayHello } as AppLoadContext
  },
  unstable_middleware: true,
})
