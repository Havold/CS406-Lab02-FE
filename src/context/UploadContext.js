import { createContext, useEffect, useState } from "react";

export const UploadContext = createContext();

export const UploadContextProvider = ({ children }) => {
  const [image, setImage] = useState(null);
  const [isEqualized, setIsEqualized] = useState(false);

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
    };
  }, [image]);

  return (
    <UploadContext.Provider
      value={{ image, setImage, isEqualized, setIsEqualized }}
    >
      {children}
    </UploadContext.Provider>
  );
};
