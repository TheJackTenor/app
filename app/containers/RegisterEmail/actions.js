import { AsyncStorage } from 'react-native';
import Toast from 'react-native-simple-toast';

import { DevSummitAxios } from '../../helpers';
/*
 * import constants
 */

import {
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_SINGLE_ERROR_FIELD,
  UPDATE_REGISTER_METHOD,
  TOGGLE_IS_REGISTERING,
  UPDATE_REGISTER_STATUS,
  RESET_STATE,
  UPDATE_IS_LOGGED_IN
} from './constants';

/*
 * Update the input fields
 * @param {field: name of the field}
 * @param {value: value to be set}
 */
export function updateInputFields(field, value) {
  return {
    type: UPDATE_SINGLE_INPUT_FIELD,
    field,
    value
  };
}

/*
 * Update register method
 * @param {value: value to be set}
 */
export function updateRegisterMethod(payload) {
  return {
    type: UPDATE_REGISTER_METHOD,
    payload
  };
}

/*
 * Update the error of input fields
 * @param {field: name of the field}
 * @param {value: value to be set}
 */
export function updateErrorFields(field, value) {
  return {
    type: UPDATE_SINGLE_ERROR_FIELD,
    field,
    value
  };
}

/*
 * update the is registering status
 * @param {value: value to be set (boolean)}
 */
export function toggleIsRegistering(status) {
  return {
    type: TOGGLE_IS_REGISTERING,
    status
  };
}

export function updateRegisterStatus(status, title, message) {
  return {
    type: UPDATE_REGISTER_STATUS,
    status,
    title,
    message
  };
}

export function resetState() {
  return {
    type: RESET_STATE
  };
}

export function updateIsLoggedIn(status) {
  return {
    type: UPDATE_IS_LOGGED_IN,
    status
  };
}

/*
 * Register user
 */
export function register(callBack) {
  return (dispatch, getState) => {
    dispatch(toggleIsRegistering(true));
    const { inputFields } = getState()
      .get('registerEmail')
      .toJS();

    const { firstName, email, password, username } = inputFields || null;

    const { lastName, referer } = inputFields || '';

    // const role_id = role === 'attendee' ? 2 : role === 'booth' ? 3 : 5;
    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      username,
      referer
    };

    if (firstName && email && password && username) {
      DevSummitAxios.post('/auth/register', data)
        .then(async (response) => {
          const resData = response.data.data;
          const roleId = JSON.stringify(response.data.included.role_id);
          const profileData = JSON.stringify(response.data.included);
          try {
            if (response && response.data.data && response.data.meta.success) {
              AsyncStorage.multiSet([
                [ 'access_token', resData.access_token ],
                [ 'refresh_token', resData.refresh_token ],
                [ 'role_id', roleId ],
                [ 'profile_data', profileData ]
              ]);
              dispatch(updateRegisterStatus(true, 'Success', 'You have been registered'));
              callBack();
            } else if (response.data.data !== null && !response.data.meta.success) {
              dispatch(updateRegisterStatus(true, 'Registered', 'You already registered'));
            } else if (response.data.data === null && !response.data.meta.success) {
              dispatch(
                updateRegisterStatus(
                  true,
                  'Failed',
                  response.data.meta.message.concat(' please login using your existing account')
                )
              );
            }
          } catch (err) {
            updateRegisterStatus(
              true,
              'Failed',
              response.data.meta.message.concat(' Failed to register, please try again later. Thanks!')
            )
            console.log(err, 'error cought');
          }
          dispatch(toggleIsRegistering(false));
        })
        .catch((error) => {
          Toast.show('Failed to register, please try again later. Thanks!', Toast.LONG);
          console.log(error, 'error caught');
        });
    }
  };
}
