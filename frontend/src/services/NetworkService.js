// [Aditya 21-01-2023]
// Network service
const NetworkService = {

    getConnectivityStatus: () => {
  
        // Promise added to handle async calls
        return new Promise((resolve, reject) => {
  
            // True/False status will returned back
            if(navigator.onLine === true) {
            resolve(true);
            } else {
            resolve(false);
            }
  
        })
  
    }
  
}
  
export default NetworkService;