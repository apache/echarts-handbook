import configAsf from './config.local'
import configDev from './config.dev'

const isProduction = process.env.NODE_ENV === 'production'
const config = isProduction ? configAsf : configDev

export default config
