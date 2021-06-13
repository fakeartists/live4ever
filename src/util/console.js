import settings from '../data/settings';
import noop from 'no-op';

/**
 * A console wrapper with line numbers that can be enabled / disabled
 * Usage:
 * import * as c from 'console'
 * c.log('abc');
 *
 * Ref: https://matthewspencer.github.io/console-log/
 */
const enabled = settings.isDevelopment;

export const log = (log => {
  if (!window.console || !console.log) {
    return noop;
  }
  if (!enabled) return noop;
  return Function.prototype.bind.call(console.log, console);
})();

export const clear = (clear => {
  if (!window.console || !console.clear) {
    return noop;
  }
  if (!enabled) return noop;
  return Function.prototype.bind.call(console.clear, console);
})();

export const debug = (debug => {
  if (!window.console || !console.debug) {
    return noop;
  }
  if (!enabled) return noop;
  return Function.prototype.bind.call(console.debug, console);
})();

export const info = (info => {
  if (!window.console || !console.info) {
    return noop;
  }
  if (!enabled) return noop;
  return Function.prototype.bind.call(console.info, console);
})();

export const warn = (warn => {
  if (!window.console || !console.warn) {
    return noop;
  }
  if (!enabled) return noop;
  return Function.prototype.bind.call(console.warn, console);
})();

export const error = (error => {
  if (!window.console || !console.error) {
    return noop;
  }
  if (!enabled) return noop;
  return Function.prototype.bind.call(console.error, console);
})();
