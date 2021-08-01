import Cookies from 'universal-cookie';

const cookies = new Cookies();
const cookieName = 'pyramid';
const cookiePath = '/';

export function initCookie() {
  const data = {
    firsttime: true,
    variation: 0,
    bidData: {
      bid: 0,
      level: 1,
      rank: 0
    },
    login: null
  };

  let cookiedata = getCookie();

  if (cookiedata !== undefined && cookiedata !== 'undefined') {
    for (const key in data) {
      if (data.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (!cookiedata.hasOwnProperty(key)) {
          cookiedata[key] = element;
        }
      }
    }

    for (const key in cookiedata) {
      if (cookiedata.hasOwnProperty.call(cookiedata, key)) {
        if (!data.hasOwnProperty(key)) {
          delete cookiedata[key];
        }
      }
    }
  } else {
    cookiedata = data;
  }

  cookies.set(cookieName, JSON.stringify(cookiedata), getCookieConfig());
}

function getCookieConfig() {
  let now = new Date();
  let time = now.getTime();
  let expireTime = time + 1000 * 36000;
  now.setTime(expireTime);

  return {
    maxAge: 60 * 60 * 24 * 365,
    expires: now,
    path: cookiePath
  };
}

export function getCookie() {
  return cookies.get(cookieName);
}

export function updateCookie(data = {}) {
  let cookiedata = getCookie();
  cookiedata = { ...cookiedata, ...data };
  cookies.set(cookieName, JSON.stringify(cookiedata), getCookieConfig());
}

export function removeCookie() {
  cookies.remove(cookieName, { path: cookiePath });
}

export function checkCookieLogin() {
  const cookiedata = getCookie();
  return cookiedata.login !== null && (cookiedata.login.email !== undefined || cookiedata.login.email !== '');
}
