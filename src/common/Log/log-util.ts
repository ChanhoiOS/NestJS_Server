export const printLog = (message?: any, ...optionalParams: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(
      '[LCH] ',
      message,
      optionalParams.length !== 0 ? optionalParams : '',
    );
  }
};
