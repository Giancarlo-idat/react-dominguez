import { Box, Button, TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Header } from "../../components";
import { useFormik } from "formik";
import { useRolContext } from "@/context";
import { initialValuesRol, validationRolSchema } from "@/utilities";
import Swal from "sweetalert2";
import LogoDominguez from "@/assets/images/logo_dominguez.png";

export const CreateRol = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { loading, createRol, errorMessage } = useRolContext();
  const navigate = useNavigate();

  const { handleSubmit, values, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues: initialValuesRol,
      validationSchema: validationRolSchema,
      onSubmit: async (values) => {
        try {
          const formattedData = {
            nombre: values.nombre,
            descripcion: values.descripcion,
          };
          await createRol(formattedData);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Rol creado con éxito",
            text: "El rol se ha creado correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/roles");
        } catch (error) {
          console.log(error.message);
          errorMessage(error.message);
        }
      },
    });

  return (
    <Box m="20px">
      <Header title="Nueva Rol" subtitle="Crear un nueva rol" />
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
            label="Nombre Rol"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.nombre}
            name="nombre"
            error={touched.nombre && errors.nombre}
            helperText={touched.nombre && errors.nombre}
            sx={{ gridColumn: "span 2" }}
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
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Crear nuevo rol
          </Button>
        </Box>
      </form>
    </Box>
  );
};
