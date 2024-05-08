import type { Config } from 'tailwindcss'

export default {
  content: ['./remix-app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    //This will disable preflight https://tailwindcss.com/docs/preflight
    preflight: false,
  },
} satisfies Config
