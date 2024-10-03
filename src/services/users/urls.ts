import { domain } from "../enviroments"

export const USERS_URL = {
  register: `${domain}/api/auth/local/register`,
  login: `${domain}/api/auth/local`,
}