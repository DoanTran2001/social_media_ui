import { ReactNode, FC, HTMLAttributes } from "react";
import { NavLink } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import './style.scss'

interface NavLinkMenuItemProps {
  to: string;
  children: ReactNode;
}

const NavLinkStyle = styled(NavLink)(() => ({
  textDecoration: "none",
  '&.activeLink': {
    background: 'green'
  }
}));

const NavLinkMenuItem: FC<
  NavLinkMenuItemProps & HTMLAttributes<HTMLElement>
> = ({ to, children, ...props }) => {
  return (
    <NavLinkStyle to={to} className={({ isActive }) => isActive ? 'activeLink' : ''}>
      <MenuItem {...props}>{children}</MenuItem>
    </NavLinkStyle>
  );
};

export default NavLinkMenuItem;
