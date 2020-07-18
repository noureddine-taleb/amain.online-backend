// require and configure dotenv, will load vars in .env in PROCESS.ENV
import { config } from 'dotenv';
import path from 'path';

export default () => config({ path: path.join(__dirname, '../../.env') })

