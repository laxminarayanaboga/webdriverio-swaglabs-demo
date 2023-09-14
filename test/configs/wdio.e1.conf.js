import {configDefault} from "./wdio.conf.js";

const overrides = {
    baseUrl: 'https://the-internet.herokuapp.com'
}
export const config = {...configDefault, ...overrides};