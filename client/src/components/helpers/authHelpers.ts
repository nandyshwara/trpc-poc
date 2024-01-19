export const getLocalStorage = (key : string) => {
    if (typeof window !== "undefined") {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }
  };
  
  export const isAuth = () => {
    if (typeof window !== "undefined") {
      if (getLocalStorage("trpc_cred")) {
        return getLocalStorage("trpc_cred");
      } else {
        return false;
      }
    }
  };
  