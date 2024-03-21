import { useState } from "react";

export const useForm = (initialForm = {}) => {
  //Hook para manejar el estado del formulario
  const [form, setForm] = useState(initialForm);

  // Funcion para manejar el cambio de los inputs del formulario
  const handleInputChange = ({ target }) => {
    // Extraemos el name y el value del input
    const { name, value } = target;

    // Actualizamos el estado del formulario con los nuevos valores
    setForm({
      ...form, // Mantenemos los valores existentes del formulario
      [name]: value, // Actualizamos el valor del campo que ha cambiado
    });
  };

  // Funcion para resetear el formulario
  const resetForm = () => {
    setForm(initialForm); // Reseteamos el formulario a su estado inicial
  };

  // Retornamos el estado del formulario, la funcion para manejar el cambio de los inputs
  // y la funcion para resetear el formulario
  return {
    ...form,
    form,
    handleInputChange,
    resetForm,
  };
};
