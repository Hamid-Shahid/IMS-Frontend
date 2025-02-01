/* 
*
Custom hook for getting token from local storage 
*/
const useGetToken = () => {
  try {
    const token = sessionStorage.getItem("session");
    if (!token) return null;
    return token;
  } catch (error) {
    console.log("Error getting token", error.message);
    return null;
  }
};

export default useGetToken;
