import settings from '../data/settings';

export function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export function getBidWithVariation(bid, variation) {
  let bidvar = parseFloat(settings.bidBase) + variation;
  return round(bid / bidvar, 2);
}
