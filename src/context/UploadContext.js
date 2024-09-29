import { createContext, useState } from "react";

export const UploadContext = createContext();

export const UploadContextProvider = ({ children }) => {
  const [image, setImage] = useState(null);

  return (
    <UploadContext.Provider value={{ image, setImage }}>
      {children}
    </UploadContext.Provider>
  );
};
