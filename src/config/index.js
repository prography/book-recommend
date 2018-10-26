import json from 'config/env/env.json';
const env = process.env.NODE_ENV || 'dev';
console.log(env);
export default json[env]; 
