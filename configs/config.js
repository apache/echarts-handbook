import configAsf from './config.asf';
import configDev from './config.dev';

const isProduction = process.env.NODE_ENV === 'production';
const config = isProduction ? configAsf : configDev;

export default config;
