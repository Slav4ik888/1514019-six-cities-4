import {getUserStatus, getAuthInfo} from './selectors.js';

const mockState = {
  authorizationStatus: `AUTH`,
  authInfo: {login: 2},
};

describe(`User reducer USER selector tests`, () => {
  it(`getUserStatus selector return correct value`, () => {
    expect(getUserStatus(mockState)).toEqual(`AUTH`);
  });
  it(`getAuthInfo selector return correct value`, () => {
    expect(getAuthInfo(mockState)).toEqual({login: 2});
  });
});
