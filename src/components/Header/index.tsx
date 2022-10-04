import { HeaderContainer } from "./styles";
import IgniteLogo from "../../assets/logo.svg";
import { Timer, Scroll } from "phosphor-react";
import { NavLink } from "react-router-dom";

export const Header = () => {
    return (
        <HeaderContainer>
            <img src={IgniteLogo} alt="" />
            <nav>
                <NavLink to="/" title="Timer">
                    <Timer size={24} />
                </NavLink>

                <NavLink to="/history" title="Histórico">
                    <Scroll size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
    );
};
