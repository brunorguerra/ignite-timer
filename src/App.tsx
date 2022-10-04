import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import { CyclesProvider } from "./context/CyclesContext";

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyle />
            <BrowserRouter>
                <CyclesProvider>
                    <Router />
                </CyclesProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
