/* eslint-disable no-await-in-loop */
import jwtService from 'jsonwebtoken';

export const randomInt = (low, high) => Math.floor(Math.random() * (high - low) + low);

export const randomVerifiedCode = () => randomInt(100000, 999999);

export const toNumber = string => (Number(string) || string === '0' ? Number(string) : string);

export const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index += 1) {
        await callback(array[index], index, array);
    }
};

export const decodeToken = token => jwtService.decode(token);

export const removeNullInObject = obj => {
    Object.keys(obj).forEach(key => {
        if (obj[key] === null) {
            delete obj[key];
        }
    });
    return obj;
};
