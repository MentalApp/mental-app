import { LIST_UNIT, CURRENT_USER } from './constants';

export const handleUnit = (unitId) => {
  return LIST_UNIT[unitId - 1].name;
};

export const checkAdminPermission = () => {
  const user = JSON.parse(localStorage.getItem(CURRENT_USER));
  if (user && user.role.includes('admin')) {
    return true;
  }
  return false;
};

export const uppercaseString = (words) => {
  var separateWord = words.toLowerCase().split(' ');
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(' ');
};
