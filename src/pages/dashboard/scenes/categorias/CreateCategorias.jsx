import { Box, Button, TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Header } from "../../components";
import { useFormik } from "formik";
import { useCategoriesContext } from "@/context";
import {
  initialValuesCategories,
  validationCategoriaSchema,
} from "@/utilities";
import LogoDominguez from "@/assets/images/logo_dominguez.png";

export const CreateCategorias = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { createCategoria, errorMessage } = useCategoriesContext();
  const navigate = useNavigate();

  const { handleSubmit, values, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues: initialValuesCategories,
      validationSchema: validationCategoriaSchema,
      onSubmit: async (values) => {
        try {
          const formattedData = {
            nombre: values.nombre,
            descripcion: values.descripcion,
            imagen: values.imagen,
          };
          await createCategoria(formattedData);
          navigate("/dashboard/categories");
        } catch (error) {
          console.log(error.message);
          errorMessage(error.message);
        }
      },
    });

  return (
    <Box m="20px">
      <Header title="Nueva Categoria" subtitle="Crear un nueva categoria" />
      <form onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="center" mb="20px">
          <img style={{ width: "250px" }} src={LogoDominguez} alt="logo" />
        </Box>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Nombre categoria"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.nombre}
            name="nombre"
            error={touched.nombre && errors.nombre}
            helperText={touched.nombre && errors.nombre}
            sx={{ gridColumn: "span 4" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Descripción"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.descripcion}
            name="descripcion"
            error={touched.descripcion && errors.descripcion}
            helperText={touched.descripcion && errors.descripcion}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Imagen"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.imagen}
            name="imagen"
            error={touched.imagen && errors.imagen}
            helperText={touched.imagen && errors.imagen}
            sx={{ gridColumn: "span 2" }}
          />

        
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Crear nueva categoria
          </Button>
        </Box>
      </form>
    </Box>
  );
};
