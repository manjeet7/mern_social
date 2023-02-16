// [Aditya 21-01-2023]
// Session Storage service
const SessionStorageService = {

    // In built sessionStorage object methods
    // Promise object added to handle async calls (through resolve, reject)
    setSessionStorage: (itemName, itemData) => {
        sessionStorage.setItem(itemName, JSON.stringify(itemData));
        console.log("Data set successfully in session storage");
    },
  
    getSessionStorage: (itemName) => {
        return new Promise((resolve, reject) => {
            var storageData = JSON.parse(sessionStorage.getItem(itemName));
            resolve(storageData);
        });
    },
  
    clearSessionStorage: () => {
        sessionStorage.clear();
        console.log("Session storage cleared successfully");
    },
  
}
  
export default SessionStorageService;