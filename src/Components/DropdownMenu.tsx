// import * as React from 'react';
// import { alpha, Button, Menu, MenuItem, MenuProps, styled } from '@mui/material';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


// export default function DropdownMenu() {
//     const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//     const open = Boolean(anchorEl);
//     const handleClose = () => {
//         setAnchorEl(null);
//     };
//     const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const StyledMenu = styled((props: MenuProps) => (
//         <Menu
//             elevation={0}
//             anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'right',
//             }}
//             transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//             }}
//             {...props}
//         />
//     ))(({ theme }) => ({
//         '& .MuiPaper-root': {
//             borderRadius: 6,
//             marginTop: theme.spacing(1),
//             minWidth: 180,
//             color: 'rgb(55, 65, 81)',
//             boxShadow:
//                 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//             '& .MuiMenu-list': {
//                 padding: '4px 0',
//             },
//             '& .MuiMenuItem-root': {
//                 '& .MuiSvgIcon-root': {
//                     fontSize: 18,
//                     color: theme.palette.text.secondary,
//                     marginRight: theme.spacing(1.5),
//                     ...theme.applyStyles('dark', {
//                         color: 'inherit',
//                     }),
//                 },
//                 '&:active': {
//                     backgroundColor: alpha(
//                         theme.palette.primary.main,
//                         theme.palette.action.selectedOpacity,
//                     ),
//                 },
//             },
//             ...theme.applyStyles('dark', {
//                 color: theme.palette.grey[300],
//             }),
//         },
//     }));

//     return (
//         <div>
//             <Button
//                 id="demo-customized-button"
//                 aria-controls={open ? 'demo-customized-menu' : undefined}
//                 aria-haspopup="true"
//                 aria-expanded={open ? 'true' : undefined}
//                 variant="contained"
//                 disableElevation
//                 onClick={handleClick}
//                 endIcon={<KeyboardArrowDownIcon />}
//             >
//                 Other Modules
//             </Button>
//             <StyledMenu
//                 id="demo-customized-menu"
//                 slotProps={{
//                     list: {
//                         'aria-labelledby': 'demo-customized-button',
//                     },
//                 }}
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleClose}
//             >
//                 <MenuItem onClick={handleClose} disableRipple>
//                     {/* <EditIcon /> */}
//                     Anomaly Detection
//                 </MenuItem>
//                 <MenuItem onClick={handleClose} disableRipple>
//                     {/* <FileCopyIcon /> */}
//                     Capacity Planning
//                 </MenuItem>
//                 {/* <Divider sx={{ my: 0.5 }} /> */}
//                 <MenuItem onClick={handleClose} disableRipple>
//                     {/* <ArchiveIcon /> */}
//                     Datasheets
//                 </MenuItem>
//                 <MenuItem onClick={handleClose} disableRipple>
//                     {/* <ArchiveIcon /> */}
//                     Preditictive Maintenance
//                 </MenuItem>
//                 <MenuItem onClick={handleClose} disableRipple>
//                     {/* <ArchiveIcon /> */}
//                     Preventive Maintenance
//                 </MenuItem>
//                 <MenuItem onClick={handleClose} disableRipple>
//                     {/* <ArchiveIcon /> */}
//                     Resource Utilization
//                 </MenuItem>
//                 <MenuItem onClick={handleClose} disableRipple>
//                     {/* <ArchiveIcon /> */}
//                     Statistical Process Control
//                 </MenuItem>
//                 {/* <MenuItem onClick={handleClose} disableRipple>
//             <MoreHorizIcon />
//             More
//             </MenuItem> */}
//             </StyledMenu>
//         </div>
//     );
// }

// import * as React from 'react';
// import { alpha, Button, Menu, MenuItem, MenuProps, styled } from '@mui/material';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import { Link } from 'react-router-dom';

// const StyledMenu = styled((props: MenuProps) => (
//   <Menu
//     elevation={0}
//     anchorOrigin={{
//       vertical: 'bottom',
//       horizontal: 'right',
//     }}
//     transformOrigin={{
//       vertical: 'top',
//       horizontal: 'right',
//     }}
//     {...props}
//   />
// ))(({ theme }) => ({
//   '& .MuiPaper-root': {
//     borderRadius: 6,
//     marginTop: theme.spacing(1),
//     minWidth: 200,
//     color: theme.palette.mode === 'dark' ? theme.palette.grey[300] : 'rgb(55, 65, 81)',
//     boxShadow:
//       'rgb(255, 255, 255) 0px 0px 0px 0px, ' +
//       'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, ' +
//       'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, ' +
//       'rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//   },
//   '& .MuiMenu-list': {
//     padding: '4px 0',
//   },
//   '& .MuiMenuItem-root': {
//     '&:active': {
//       backgroundColor: alpha(
//         theme.palette.primary.main,
//         theme.palette.action.selectedOpacity
//       ),
//     },
//   },
// }));

// export default function DropdownMenu() {
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <Button
//         id="modules-button"
//         aria-controls={open ? 'modules-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         color="inherit"
//         variant="text"            // use text to blend with AppBar; change to 'contained' if you prefer
//         disableElevation
//         onClick={handleClick}
//         endIcon={<KeyboardArrowDownIcon />}
//         sx={{ ml: 1 }}
//       >
//         Other Modules
//       </Button>

//       <StyledMenu
//         id="modules-menu"
//         slotProps={{
//           list: { 'aria-labelledby': 'modules-button' },
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//       >
//         {/* Each MenuItem navigates to a route */}
//         <MenuItem component={Link} to="/anomaly-detection" onClick={handleClose}>
//           Anomaly Detection
//         </MenuItem>
//         <MenuItem component={Link} to="/capacity-planning" onClick={handleClose}>
//           Capacity Planning
//         </MenuItem>
//         <MenuItem component={Link} to="/datasheet" onClick={handleClose}>
//           Datasheets
//         </MenuItem>
//         <MenuItem component={Link} to="/predictive-maintenance" onClick={handleClose}>
//           Predictive Maintenance
//         </MenuItem>
//         <MenuItem component={Link} to="/preventive-maintenance" onClick={handleClose}>
//           Preventive Maintenance
//         </MenuItem>
//         <MenuItem component={Link} to="/resource-utilization" onClick={handleClose}>
//           Resource Utilization
//         </MenuItem>
//         <MenuItem component={Link} to="/statistical-process-control" onClick={handleClose}>
//           Statistical Process Control
//         </MenuItem>
//       </StyledMenu>
//     </div>
//   );
// }



// import * as React from "react";
// import { alpha, Button, Menu, MenuItem, MenuProps, styled } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import { Link } from "react-router-dom";


// type DropdownItem = {
//   label: string;
//   to: string;              // router path
//   icon?: React.ReactNode;  // optional icon
//   disabled?: boolean;
//   target?: string;         // if you ever want to open in new tab
//   rel?: string;            // rel attr for security
// };

// type DropdownMenuProps = {
//   id?: string;                            // button id; used to link aria to menu
//   buttonLabel?: string;                   // text on the button
//   items: DropdownItem[];                  // menu items list
//   endIcon?: React.ReactNode;              // arrow icon (default: KeyboardArrowDownIcon)
//   startIcon?: React.ReactNode;            // optional icon on button
//   buttonVariant?: "text" | "outlined" | "contained";
//   buttonColor?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
//   sx?: any;                               // MUI sx for button
//   menuProps?: Partial<MenuProps>;         // pass extra props to Menu
//   onItemClick?: (item: DropdownItem) => void; // callback when an item is clicked
// };

// const StyledMenu = styled((props: MenuProps) => (
//   <Menu
//     elevation={0}
//     anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//     transformOrigin={{ vertical: "top", horizontal: "right" }}
//     {...props}
//   />
// ))(({ theme }) => ({
//   "& .MuiPaper-root": {
//     borderRadius: 6,
//     marginTop: theme.spacing(1),
//     minWidth: 220,
//     color: theme.palette.mode === "dark" ? theme.palette.grey[300] : "rgb(55, 65, 81)",
//     boxShadow:
//       "rgb(255, 255, 255) 0px 0px 0px 0px, " +
//       "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, " +
//       "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, " +
//       "rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
//   },
//   "& .MuiMenu-list": {
//     padding: "4px 0",
//   },
//   "& .MuiMenuItem-root": {
//     gap: theme.spacing(1.5),
//     "&:active": {
//       backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
//     },
//   },
// }));

// const DropdownMenu: React.FC<DropdownMenuProps> = ({
//   id = "dropdown-button",
//   buttonLabel = "Other Modules",
//   items,
//   endIcon = <KeyboardArrowDownIcon />,
//   startIcon,
//   buttonVariant = "text",
//   buttonColor = "inherit",
//   sx,
//   menuProps,
//   onItemClick,
// }) => {
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   return (
//     <>
//       <Button
//         id={id}
//         aria-controls={open ? `${id}-menu` : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? "true" : undefined}
//         color={buttonColor}
//         variant={buttonVariant}
//         disableElevation
//         onClick={handleClick}
//         endIcon={endIcon}
//         startIcon={startIcon}
//         sx={sx}
//       >
//         {buttonLabel}
//       </Button>

//       <StyledMenu
//         id={`${id}-menu`}
//         MenuListProps={{ "aria-labelledby": id }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         {...menuProps}
//       >
//         {items.map((item) => (
//           <MenuItem
//             key={item.label}
//             component={Link}
//             to={item.to}
//             onClick={() => {
//               onItemClick?.(item);
//               handleClose();
//             }}
//             disabled={item.disabled}
//             target={item.target}
//             rel={item.rel}
//           >
//             {item.icon}
//             {item.label}
//           </MenuItem>
//         ))}
//       </StyledMenu>
//     </>
//   );
// };

// export default DropdownMenu;
// export { DropdownMenu };

// /** Convenience wrapper that keeps your current routes exactly as-is. */
// export const ModulesDropdown: React.FC = () => {
//   const items: DropdownItem[] = [
//     { label: "Anomaly Detection", to: "/anomaly-detection" },
//     { label: "Capacity Planning", to: "/capacity-planning" },
//     { label: "Datasheets", to: "/datasheet" },
//     { label: "Predictive Maintenance", to: "/predictive-maintenance" },
//     { label: "Preventive Maintenance", to: "/preventive-maintenance" },
//     { label: "Resource Utilization", to: "/resource-utilization" },
//     { label: "Statistical Process Control", to: "/statistical-process-control" },
//   ];

//   return (
//     <DropdownMenu
//       id="modules-button"
//       buttonLabel="Other Modules"
//       items={items}
//       buttonVariant="text"
//       buttonColor="inherit"
//       sx={{ ml: 1 }}
//     />
//   );
// };




// src/Components/DropdownMenu.tsx
import * as React from "react";
import { alpha, Button, Menu, MenuItem, MenuProps, styled } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";

export type DropdownItem = {
  label: string;
  to: string;              // router path
  icon?: React.ReactNode;  // optional icon
  disabled?: boolean;
  target?: string;         // if you ever want to open in new tab
  rel?: string;            // rel attr for security
};

export type DropdownMenuProps = {
  id?: string;                            // button id; used to link aria to menu
  buttonLabel?: string;                   // text on the button
  items: DropdownItem[];                  // ✅ required
  endIcon?: React.ReactNode;              // arrow icon (default: KeyboardArrowDownIcon)
  startIcon?: React.ReactNode;            // optional icon on button
  buttonVariant?: "text" | "outlined" | "contained";
  buttonColor?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  sx?: any;                               // MUI sx for button
  menuProps?: Partial<MenuProps>;         // pass extra props to Menu
  onItemClick?: (item: DropdownItem) => void; // callback when an item is clicked
};

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 220,
    color: theme.palette.mode === "dark" ? theme.palette.grey[300] : "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, " +
      "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, " +
      "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, " +
      "rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  },
  "& .MuiMenu-list": {
    padding: "4px 0",
  },
  "& .MuiMenuItem-root": {
    gap: theme.spacing(1.5),
    "&:active": {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    },
  },
}));

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  id = "dropdown-button",
  buttonLabel = "Other Modules",
  items,
  endIcon = <KeyboardArrowDownIcon />,
  startIcon,
  buttonVariant = "text",
  buttonColor = "inherit",
  sx,
  menuProps,
  onItemClick,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button
        id={id}
        aria-controls={open ? `${id}-menu` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        color={buttonColor}
        variant={buttonVariant}
        disableElevation
        onClick={handleClick}
        endIcon={endIcon}
        startIcon={startIcon}
        sx={sx}
      >
        {buttonLabel}
      </Button>

      <StyledMenu
        id={`${id}-menu`}
        MenuListProps={{ "aria-labelledby": id }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        {...menuProps}
      >
        {items.map((item) => (
          <MenuItem
            key={item.label}
            component={Link}
            to={item.to}
            onClick={() => {
              onItemClick?.(item);
              handleClose();
            }}
            disabled={item.disabled}
            target={item.target}
            rel={item.rel}
          >
            {item.icon}
            {item.label}
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default DropdownMenu;
export { DropdownMenu };

/** Convenience wrapper that keeps your current routes exactly as-is. */
export const ModulesDropdown: React.FC = () => {
  const items: DropdownItem[] = [
    { label: "Anomaly Detection", to: "/anomaly-detection" },
    { label: "Capacity Planning", to: "/capacity-planning" },
    { label: "Datasheets", to: "/datasheet" },
    { label: "Predictive Maintenance", to: "/predictive-maintenance" },
    { label: "Preventive Maintenance", to: "/preventive-maintenance" },
    { label: "Resource Utilization", to: "/resource-utilization" },
    { label: "Statistical Process Control", to: "/statistical-process-control" },
  ];

  return (
    <DropdownMenu
      id="modules-button"
      buttonLabel="Other Modules"
      items={items}
      buttonVariant="text"
      buttonColor="inherit"
      sx={{ ml: 1 }}
    />
  );
};