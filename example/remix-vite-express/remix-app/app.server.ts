import morgan from 'morgan'
import { createExpressApp } from 'remix-create-express-app'
import { sayHello } from './hello.server'
import { AppLoadContext, Session } from '@remix-run/node'
import compression from 'compression'
import { importWithoutClientFiles } from 'payload/node'
import path from 'path'
import { type Payload, getPayload } from 'payload'
import { SanitizedConfig } from 'payload/types'
import { type SessionData, type SessionFlashData } from './session.server'
import { auth } from './auth.server.js'
import { User } from 'payload/auth'

// initiate payload local API
const configPath = path.join(process.cwd(), 'payload.config.ts')
const fullConfig = await importWithoutClientFiles<{
  default: Promise<SanitizedConfig>
}>(configPath)

const payload = await getPayload({ config: await fullConfig.default })

// This creates an express server that runs inside vite
export const app = createExpressApp({
  configure: app => {
    // customize your express app with additional middleware
    app.use(compression())
    app.disable('x-powered-by')
    app.use(morgan('tiny'))
  },
  getLoadContext: async req => {
    // @ts-expect-error this should always exist
    const headers = new Headers(req.headers)
    const result = await auth({ headers, payload })

    // return the AppLoadContext
    return { sayHello, payload, user: result?.user } as AppLoadContext
  },
  unstable_middleware: true,
})

declare module '@remix-run/server-runtime' {
  export interface AppLoadContext {
    sayHello: () => string
    payload: Payload
    session: Session<SessionData, SessionFlashData>
    user?: User
  }
}
