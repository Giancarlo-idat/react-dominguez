// En el contexto de la aplicación

import { createContext, useContext, useState } from "react";

// Creamos un contexto para el estado del modal
const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const openModal = () => {
    document.body.style.overflow = "hidden";
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    document.body.style.overflow = "auto";
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
