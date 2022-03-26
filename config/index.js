const { env } = process;
let envFile = '.env';

if (env.NODE_ENV) {
    switch (env.NODE_ENV.toString().trim()) {
        case 'development':
            envFile = '.dev.env';
            break;
        case 'test':
            envFile = '.test.env';
            break;
        default:
            envFile = '.dev.env';
        break;
    }
}else{
    env.NODE_ENV= 'development';
    envFile = '.dev.env';
}
console.log(envFile)
// Load env variables from file based on NODE_ENV
require('dotenv').config({ path: `./${envFile}`, silent: true });

module.exports = {
    host: env.HOST,
    port: env.PORT,
    ip_prefix:env.ip_prefix,
    PRIVATE_KEY: env.SECRET,
    mongodbUserUri: env.MONGODB_USER_URI
};
