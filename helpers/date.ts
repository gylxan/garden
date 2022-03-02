import format from 'date-fns/format';
import parse from 'date-fns/parse';

export const parseDate = (date: string, format = 'yyyy-MM-dd') => parse(date, format, new Date());

export const formatDate = (date: Date, dateFormat = 'yyyy-MM-dd') => format(date, dateFormat);
