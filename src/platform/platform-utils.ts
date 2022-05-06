import { Platform } from './platform';


export function isCordova(plt: Platform): boolean {
  const win: any = plt.win();
  return !!(win['cordova'] || win['PhoneGap'] || win['phonegap']);
}

export function isElectron(plt: Platform): boolean {
  return plt.testUserAgent('Electron');
}
export function isIpad(plt: Platform): boolean {
  // iOS 12 and below
  if (testUserAgent(plt.win(), /iPad/i)) {
    return true;
  }

  // iOS 13+
  if (testUserAgent(plt.win(), /Macintosh/i) && isMobile(plt.win())) {
    return true;
  }

  return false;
}

export function isIphone(plt: Platform): boolean {
  return testUserAgent(plt.win(), /iPhone/i);
}

export function isIos(plt: Platform): boolean {
  return testUserAgent(plt.win(), /iPhone|iPod/i) || isIpad(plt);
}

const isMobile = (win: Window) => matchMedia(win, '(any-pointer:coarse)');

export function isSafari(plt: Platform): boolean {
  return plt.testUserAgent('Safari');
}


export function isWKWebView(plt: Platform): boolean {
  return isIos(plt) && !!(<any>plt.win())['webkit'];
}

export function isIosUIWebView(plt: Platform): boolean {
  return isIos(plt) && !isWKWebView(plt) && !isSafari(plt);
}


export function testUserAgent(win: Window, expr: RegExp): boolean {
  return expr.test(win.navigator.userAgent);
}

export function matchMedia(win: Window, query: string): boolean {
  return win.matchMedia(query).matches;
}
