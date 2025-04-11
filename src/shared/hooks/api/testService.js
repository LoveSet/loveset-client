import LoanProviderExampleImg from "../../../assets/img/carbon.svg";

export const creditHistory = async () => {
  await timeout(1000);
  clearTimeout();

  // test data
  return {
    data: [],
  };
};

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}
