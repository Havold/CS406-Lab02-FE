import { createContext, useEffect, useState } from "react";

export const UploadContext = createContext();

export const UploadContextProvider = ({ children }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
    };
  }, [image]);

  return (
    <UploadContext.Provider value={{ image, setImage }}>
      {children}
    </UploadContext.Provider>
  );
};
