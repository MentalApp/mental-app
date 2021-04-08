import { LIST_UNIT } from './constants';

export const handleUnit = (unitId) => {
  return LIST_UNIT[unitId - 1].name;
};
