import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Header } from "../../components";
import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";
import { useAuth, useTipDocument } from "@/context";
import { validationSchema, initialValues } from "@/utilities";
import Select from "@mui/material/Select";
import LogoDominguez from "@/assets/images/logo_dominguez.png";

export const RegisterEmployee = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { tipoDocumentos } = useTipDocument();
  const { onRegister, setLoading } = useAuth();
  const [viewPassword, setViewPassword] = useState(false);
  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };
  const navigate = useNavigate();
  const { handleSubmit, values, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        try {
          const selectedTipoDocumento = tipoDocumentos.find(
            (doc) => doc.id === values.tipoDocumento
          );

          if (!selectedTipoDocumento) {
            console.error("Error: Tipo de documento no encontrado");
            return;
          }

          const formattedData = {
            nombres: values.nombres,
            apellidos: values.apellidos,
            direccion: values.direccion,
            telefono: values.telefono,
            email: values.email,
            password: values.password,
            tipoDocumento: {
              id: selectedTipoDocumento.id,
              nombre: selectedTipoDocumento.nombre,
            },
            numeroDocumento: values.numeroDocumento,
            sexo: values.sexo,
          };

          await onRegister(formattedData);
          navigate("/dashboard/client");
          console.log("Datos enviados:", formattedData);
        } catch (error) {
          console.log(error.message);
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <Box m="20px">
      <Header title="Nuevo cliente" subtitle="Crear un nuevo cliente" />

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
            label="Nombres"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.nombres}
            name="nombres"
            error={touched.nombres && errors.nombres}
            helperText={touched.nombres && errors.nombres}
            sx={{ gridColumn: "span 4" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Apellidos"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.apellidos}
            name="apellidos"
            error={touched.apellidos && errors.apellidos}
            helperText={touched.apellidos && errors.apellidos}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Direccion"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.direccion}
            name="direccion"
            error={touched.direccion && errors.direccion}
            helperText={touched.direccion && errors.direccion}
            sx={{ gridColumn: "span 2" }}
          />

          <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
            <InputLabel id="sexo">Seleccion su sexo</InputLabel>
            <Select
              label="Sexo"
              id="sexo"
              name="sexo"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.sexo}
              fullWidth
              variant="filled"
              error={touched.sexo && errors.sexo}
            >
              <MenuItem value="" disabled>
                Seleccione una opción
              </MenuItem>

              <MenuItem value={"Masculino"}>Masculino</MenuItem>
              <MenuItem value={"Femenino"}>Femenino</MenuItem>
              <MenuItem value={"Otro"}>Otro</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
            <InputLabel id="tipoDocumento">Tipo de Documento</InputLabel>
            <Select
              label="Tipo de Documento"
              id="tipoDocumento"
              name="tipoDocumento"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.tipoDocumento}
              fullWidth
              variant="filled"
              error={touched.tipoDocumento && errors.tipoDocumento}
            >
              <MenuItem value="" disabled>
                Seleccione una opción
              </MenuItem>
              {tipoDocumentos?.map((doc) => (
                <MenuItem key={doc.id} value={doc.id}>
                  {doc.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="N° de Documento"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.numeroDocumento}
            name="numeroDocumento"
            error={touched.numeroDocumento && errors.numeroDocumento}
            helperText={touched.numeroDocumento && errors.numeroDocumento}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Telefono"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.telefono}
            name="telefono"
            error={touched.telefono && errors.telefono}
            helperText={touched.telefono && errors.telefono}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Correo electrónico"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name="email"
            error={touched.email && errors.email}
            helperText={touched.email && errors.email}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Contraseña"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            name="password"
            error={touched.password && errors.password}
            helperText={touched.password && errors.password}
            sx={{ gridColumn: "span 2" }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Crear nuevo cliente
          </Button>
        </Box>
      </form>
    </Box>
  );
};
