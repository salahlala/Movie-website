import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsloading] = useState();
  const [error, setError] = useState();
  const sendRequest = useCallback(async (request, applyData) => {
    setIsloading(true);
    setError(null);
    try {
      const respon = await fetch(request.url, {
        method: request.method ? request.method : "GET",
        body: request.body ? request.body : null,
        headers: request.headers ? request.headers : {},
      });

      if (!respon.ok) {
        throw new Error("error");
      }
      const data = await respon.json();
      applyData(data);
    } catch (error) {
      setError("Failed to fetch data");
    }
    setIsloading(false);
  }, []);

  return {
    sendRequest,
    isLoading,
    error,
  };
};

export default useHttp;
