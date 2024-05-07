import morgan from 'morgan'
import { createExpressApp } from 'remix-create-express-app'
import { sayHello } from './hello.server'
import { AppLoadContext } from '@remix-run/node'

// This creates an express server that runs inside vite
export const app = createExpressApp({
  configure: app => {
    // customize your express app with additional middleware
    app.use(morgan('tiny'))
  },
  getLoadContext: () => {
    // return the AppLoadContext
    return { sayHello } as AppLoadContext
  },
  unstable_middleware: true,
})
