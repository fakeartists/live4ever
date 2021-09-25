import Cookies from 'universal-cookie';

const cookies = new Cookies();
const cookieName = 'pyramid';
const cookiePath = '/';

const words = {
  a: 'e',
  b: 'f',
  c: 'x',
  d: 'g',
  e: 'i',
  f: 'h',
  g: 'f',
  h: 'c',
  i: 'o',
  j: 'm',
  k: 'y',
  l: 'b',
  m: 'p',
  n: 'd',
  o: 'a',
  p: 's',
  q: 'j',
  r: 'w',
  s: 'u',
  t: 'z',
  u: 'r',
  v: 'k',
  x: 'n',
  y: 'l',
  w: 't',
  z: 'q',
  à: 'e',
  á: 'e',
  â: 'e',
  ã: 'e',
  ā: 'e',
  ă: 'e',
  ä: 'e',
  å: 'e',
  ą: 'e',
  æ: 'e',
  è: 'i',
  é: 'i',
  ê: 'i',
  ë: 'i',
  ē: 'i',
  ĕ: 'i',
  ė: 'i',
  ę: 'i',
  ě: 'i',
  ì: 'i',
  í: 'i',
  î: 'i',
  ï: 'i',
  ð: 'i',
  ñ: 'd',
  ò: 'a',
  ó: 'a',
  ô: 'a',
  õ: 'a',
  ø: 'a',
  ö: 'a',
  ù: 'i',
  ú: 'd',
  û: 'a',
  ü: 'a',
  ý: 'a',
  þ: 'a',
  ÿ: 'a',
  ć: 'x',
  ĉ: 'x',
  č: 'x',
  ċ: 'x',
  ď: 'x'
};

const lastNames = {
  a: 'Smith',
  b: 'Johnson',
  c: 'Williams',
  d: 'Brown',
  e: 'White',
  f: 'Baker',
  g: 'Hayes',
  h: 'Cash',
  i: 'Bezos',
  j: 'Carter',
  k: 'Roberts',
  l: 'Mitchell',
  m: 'Nelson',
  n: 'Rivera',
  o: 'Campbell',
  p: 'Hall',
  q: 'Jobs',
  r: 'Gates',
  s: 'Garcia',
  t: 'Musk',
  u: 'Flores',
  v: 'Adams',
  x: 'Green',
  y: 'Hill',
  w: 'Nguyen',
  z: 'Torres',
  à: 'Miller',
  á: 'Davis',
  â: 'Jones',
  ã: 'Rodriguez',
  ā: 'Martinez',
  ă: 'Hernandez',
  ä: 'Lopez',
  å: 'Mango',
  ą: 'Roberts',
  æ: 'Miller',
  è: 'Bezos',
  é: 'Scott',
  ê: 'Hall',
  ë: 'Lopez',
  ē: 'King',
  ĕ: 'Scott',
  ė: 'Flores',
  ę: 'Lopez',
  ě: 'Hero',
  ì: 'White',
  í: 'Scott',
  î: 'Wright',
  ï: 'King',
  ð: 'Allen',
  ñ: 'Young',
  ò: 'Walker',
  ó: 'Robinson',
  ô: 'Lewis',
  õ: 'Moore',
  ø: 'Jackson',
  ö: 'Martin',
  ù: 'Lee',
  ú: 'Perez',
  û: 'Thompson',
  ü: 'Harris',
  ý: 'Sanchez',
  þ: 'Clark',
  ÿ: 'Ramirez',
  ć: 'Taylor',
  ĉ: 'Thomas',
  č: 'Anderson',
  ċ: 'Wilson',
  ď: 'Gonzalez'
};

export function initCookie() {
  const data = {
    firsttime: true,
    onboarding: false,
    variation: 0,
    promotionbanner: false,
    bannershared: false,
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
    path: cookiePath,
    secure: true,
    sameSite: true
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

export function setName(name) {
  let names = name.split(' ');
  let old_name = names[0];
  let new_name = '';
  for (var i = 0; i < old_name.length; i++) {
    if (i > 0) {
      let char = words[old_name.charAt(i).toLowerCase()];
      if (char !== undefined) {
        new_name += char;
      } else {
        new_name += 'x';
      }
    } else {
      new_name += old_name.charAt(i).toUpperCase();
    }
  }

  let last_name = 'Smith';
  if (names.length > 1) {
    let old_last_name = names[1];
    last_name = lastNames[old_last_name.charAt(0).toLowerCase()];
  }

  return new_name + ' ' + last_name;
}

export function checkCookieLogin() {
  const cookiedata = getCookie();
  return cookiedata.login !== null && (cookiedata.login.email !== undefined || cookiedata.login.email !== '');
}
