import PayPal from 'react-native-paypal';
import Toast from 'react-native-simple-toast';
import { DevSummitAxios, getAccessToken } from '../../helpers';

/*
 * import constants
 */
import {
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_SINGLE_ERROR_FIELD,
  IS_PAYING_WITH_PAYPAL,
  UPDATE_USER_ID,
  UPDATE_ORDER
} from './constants';

/*
 * import Paypal Constants
 */
import {
  PAYPAL_CLIENT_ID,
  PAYPAL_CURRENCY,
  PAYPAL_RATE,
  PAYPAL_ENV
} from '../../constants';

// update user id
export function updateUserId(value) {
  return {
    type: UPDATE_USER_ID,
    value
  };
}

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
 * Change the state of paying with PayPal
 * @param {value: set if paying with paypal in progress}
 */
export function isPayingWithPaypal(value) {
  return {
    type: IS_PAYING_WITH_PAYPAL,
    value
  };
}

// update order
// export function updateOrder(value){
//   return {
//     type: UPDATE_ORDER,
//     value
//   }
// }

/*
 * Initiate payment with PayPal
 * @param {order: order data}
*/

export function payWithBankTransfer(userId, order, referalCode, callback = () => ({})) {
  return (dispatch) => {
    const orderItems = Object.keys(order).map((key) => { return order[key]; });
    const data = {
      user_id: userId,
      order_details: orderItems,
      referal_code: referalCode,
      payment_type: 'bank_transfer'
    };
    getAccessToken()
      .then((accessToken) => {
        DevSummitAxios.post('api/v1/orders', data, {
          headers: {
            Authorization: accessToken,
            'content-type': 'application/json'
          }
        })
          .then((response) => {
            if (response.data && response.data.meta.success) {
              callback({
                ...response.data.data,
                ...response.data.included[0]
              });
            }
          })
          .catch((error) => {
            Toast.show('Sorry, something went wrong');
            console.log('ERROR', error);
          });
      });
  };
}

export function payWithPaypal(order, callback = () => {}) {
  return (dispatch) => {
    dispatch(isPayingWithPaypal(true));
    PayPal.paymentRequest({
      clientId: PAYPAL_CLIENT_ID,
      environment: PAYPAL_ENV,
      price: (order.price * order.count).toFixed(2).toString(),
      currency: PAYPAL_CURRENCY,
      description: 'Ticket for full 3-day event'
    }).then(({ confirmation }) => {
      const { response } = confirmation;
      return getAccessToken()
        .then((accessToken) => {
          const data = {
            order_id: order.order_id,
            transaction_id: response.id,
            payment_type: 'paypal'
          };
          return DevSummitAxios.post('/api/v1/payments/confirm', data, {
            headers: { Authorization: accessToken }
          });
        }).then((result) => {
          dispatch(isPayingWithPaypal(false));
          callback(result);
        }).catch((error) => {
          dispatch(isPayingWithPaypal(false));
        });
    })
      .catch((error) => {
        console.log(error);
        dispatch(isPayingWithPaypal(false));
      });
  };
}
