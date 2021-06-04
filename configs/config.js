import configDev from './config.dev'
import configGh from './config.gh'
import configAsf from './config.asf'
import configLocal from './config.local'
import configLocalSite from './config.localsite'

const deployConfigs = {
  gh: configGh,
  asf: configAsf,
  local: configLocal,
  localsite: configLocalSite
}

function getDeployConfig() {
  const deployTarget = process.env.NUXT_ENV_DEPLOY

  if (!deployTarget) {
    throw `process.env.NUXT_ENV_DEPLOY not exits`
  }
  if (!deployConfigs[deployTarget]) {
    throw `Deploy config ${deployTarget} not exits`
  }
  return deployConfigs[deployTarget]
}

const isProduction = process.env.NODE_ENV === 'production'
const config = isProduction ? getDeployConfig() : configDev

export default config
