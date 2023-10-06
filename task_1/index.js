import {encoded, translations} from './data.js'

const decodeObject = (obj, translationMap, excludeKeys = []) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (key.endsWith('Id') && !excludeKeys.includes(key)) {
        return [key, translationMap[value] !== undefined ? translationMap[value] : value];
      }
      return [key, value];
    })
  );
};

const excludeKeys = ['groupId', 'service', 'formatSize', 'ca'];

const decoded = encoded.map(obj => decodeObject(obj, translations, excludeKeys));

const uniqueIds = new Set();
encoded.forEach(obj => {
  Object.entries(obj).forEach(([key, value]) => {
    if (key.endsWith('Id') && value !== null) {
      uniqueIds.add(value);
    }
  });
});

// console.log("Let's rock");
// console.log('Decoded:', decoded);

console.log(decoded)
console.log('Unique Ids:', Array.from(uniqueIds).sort());
