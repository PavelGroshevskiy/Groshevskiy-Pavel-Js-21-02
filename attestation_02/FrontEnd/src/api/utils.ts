import moment, { Moment } from 'moment';
import 'moment/locale/ru';
import { STORAGE_PAGE_SIZE_KEY } from '../constants/common';
import { AUTH_STORAGE, DARK_THEME } from '../constants/localStorage';
import { UserType } from '../types/api/dumMyApiResponses';
import { maxDate, minDate } from '../constants/api/dumMyApi';

export const getDefaultPageSize = (prefix: string = ''): number => parseInt(localStorage.getItem(prefix.concat('/', STORAGE_PAGE_SIZE_KEY)) || '20', 10);
export const setDefaultPageSize = (pageSize: number, prefix: string = ''): void => localStorage.setItem(prefix.concat('/', STORAGE_PAGE_SIZE_KEY), pageSize.toString());

export const getDarkTheme = (): string => localStorage.getItem(DARK_THEME) || 'FALSE';
export const setDarkTheme = (theme: string): void => localStorage.setItem(DARK_THEME, theme);

export const getAuthId = (): UserType | undefined => {
  if (localStorage.getItem(AUTH_STORAGE) !== null) {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE) as string) as UserType;
  }
  return undefined;
};

export const setAuthId = (user: UserType | undefined): void => {
  if (user) {
    localStorage.setItem(AUTH_STORAGE, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_STORAGE);
  }
};

export const formatDateTime = (value: string | undefined): string => {
  moment.locale('en');
  if (!value) {
    return '';
  }
  return moment(value).format('D MMM в HH:MM');
};

export const disabledDate = (d: Moment): boolean => (minDate != null && d.isBefore(minDate) && !d.isSame(minDate, 'day'))
  || (maxDate != null && d.isAfter(maxDate) && !d.isSame(maxDate, 'day'));
