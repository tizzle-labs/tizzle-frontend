import { utils } from 'near-api-js';

export const buyToken = async (amount, selector, accountId, contractName) => {
  if (!selector || !accountId) {
    throw new Error('Wallet not connected');
  }

  if (!contractName) {
    throw new Error('Contract name is not defined');
  }

  const wallet = await selector.wallet();
  const amountInYoctoNEAR = utils.format.parseNearAmount(amount.toString());

  try {
    const result = await wallet.signAndSendTransaction({
      signerId: accountId,
      receiverId: contractName,
      actions: [
        {
          type: 'FunctionCall',
          params: {
            methodName: 'buyToken',
            args: {},
            gas: '300000000000000', // 300 TGas
            deposit: amountInYoctoNEAR,
          },
        },
      ],
    });

    console.log('Token purchase successful:', result);
    return result;
  } catch (error) {
    console.error('Error buying token:', error);
    throw error;
  }
};
