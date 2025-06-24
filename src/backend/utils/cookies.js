import CONFIG from "../config/config";

const serializeCookie = (name, value, options = {}) => {
  const { maxAge, path = "/", httpOnly = true, secure, sameSite } = options;
  let cookie = `${name}=${value}; Path=${path}; HttpOnly=${httpOnly};`;

  if (secure) cookie += " Secure;";
  if (sameSite) cookie += ` SameSite=${sameSite};`;
  if (maxAge) cookie += ` Max-Age=${Math.floor(maxAge / 1000)};`;

  return cookie;
};

export const setAuthCookies = (res, tokenName, token, maxAge) => {
  const { SECURE, SAME_SITE } = CONFIG.COOKIE;

  const cookie = serializeCookie(tokenName, token, {
    httpOnly: true,
    secure: SECURE,
    sameSite: SAME_SITE,
    path: "/",
    maxAge,
  });

  res.setHeader("Set-Cookie", [...(res.getHeader("Set-Cookie") || []), cookie]);
};

export const setAccessToken = (res, token) => {
  const maxAge = 15 * 60 * 1000;
  setAuthCookies(res, "accessToken", token, maxAge);
};

export const setRefreshToken = (res, token) => {
  const maxAge = 7 * 24 * 60 * 60 * 1000;
  setAuthCookies(res, "refreshToken", token, maxAge);
};
