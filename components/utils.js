export class SafeLocalStorage {
  static getItem(key) {
    if (this.storageAvailable()) {
      return window.localStorage?.getItem(key);
    }
    return undefined;
  }

  static setItem(key, value) {
    if (this.storageAvailable()) {
      window.localStorage?.setItem(key, value);
    }
  }

  static clear() {
    if (this.storageAvailable()) {
      window.localStorage?.clear();
    }
  }

  static removeItem(key) {
    if (this.storageAvailable()) {
      window.localStorage?.removeItem(key);
    }
  }

  static key(idx) {
    if (this.storageAvailable()) {
      window.localStorage?.key(idx);
    }
  }

  static storageAvailable(type = "localStorage") {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      //console.log(e);
      return false;
    }
  }
}

//for getting jwt token from cookie
export function getCookie(name) {
  if (typeof self === "undefined") return null;
  const cookieName = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
}

export function setCookie(name, value, daysToExpire) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  const cookieValue =
    encodeURIComponent(value) +
    (daysToExpire ? `; expires=${expirationDate.toUTCString()}` : "");
  document.cookie = `${name}=${cookieValue}; path=/`;
}

export function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function createQueryString(names = [], values = []) {
  const params = new URLSearchParams();
  for (let i = 0; i < names.length; i++) {
    if (values[i] !== null && values[i] !== undefined)
      params.set(names[i], values[i]);
  }

  return params.toString();
}
