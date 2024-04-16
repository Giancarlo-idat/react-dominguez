import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import BadgeIcon from "@mui/icons-material/Badge";
import CategoryIcon from "@mui/icons-material/Category";
import ComputerIcon from "@mui/icons-material/Computer";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { useEmployeeContext } from "@/context";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoDominguez from "@/assets/images/logo_dominguez.png";
import "react-pro-sidebar/dist/css/styles.css";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

export const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { employeeProfile, loading } = useEmployeeContext();

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  /* src={`../../assets/user.png`} */
                  src={LogoDominguez}
                  style={{
                    cursor: "pointer",
                    width: "150px",
                    height: "50px",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {employeeProfile?.nombres}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Entidades
            </Typography>
            <Item
              title="Empleados"
              to="/dashboard/team"
              icon={<BadgeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Clientes"
              to="/dashboard/client"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Roles"
              to="/dashboard/roles"
              icon={<SupervisedUserCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Proveedores"
              to="/dashboard/proveedor"
              icon={<PermContactCalendarIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Ventas"
              to="/dashboard/ventas"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Categorias"
              to="/dashboard/categories"
              icon={<CategoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Productos"
              to="/dashboard/products"
              icon={<ComputerIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Orden
            </Typography>
            <Item
              title="Ordenes"
              to="/dashboard/bar"
              icon={<ReceiptIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
