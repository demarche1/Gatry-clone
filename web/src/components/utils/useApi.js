import axios from "axios";
import { useState } from "react";
import useDebouncedPromise from "./useDebouncedPromise";
const initialRequestInfo = {
  loading: false,
  data: null,
  error: null,
};

const useApi = (config) => {
  const [requestInfo, setRequestInfo] = useState(initialRequestInfo);
  const debounceAxios = useDebouncedPromise(axios, config.debounceDelay);

  const call = async (localConfig) => {
    let response = null;

    const finalConfig = {
      baseURL: "http://localhost:5000",
      ...config,
      ...localConfig,
    };

    if (!finalConfig.quietly) {
      setRequestInfo({
        ...initialRequestInfo,
        loading: true,
      });
    }

    const fn = localConfig.debounced ? debounceAxios : axios;

    try {
      response = await fn(finalConfig);
      setRequestInfo({
        ...initialRequestInfo,
        data: response.data,
      });
    } catch (error) {
      setRequestInfo({
        ...initialRequestInfo,
        error,
      });
    }

    if (config.onCompleted) {
      config.onCompleted(response);
    }
  };

  return [call, requestInfo];
};

export default useApi;
