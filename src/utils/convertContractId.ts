export const convertContractId = {
  param2display(contractId: string) {
    return contractId.replace("-", "/");
  },
  display2param(contractId: string) {
    return contractId.replace("/", "-");
  },
};
