export const buyToken = async (amount, selector, accountId, contractName) => {
  if (!selector || !accountId) {
    throw new Error('Wallet not connected');
  }

  if (!contractName) {
    throw new Error('Contract name is not defined');
  }

  return;
};
