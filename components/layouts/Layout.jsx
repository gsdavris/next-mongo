import Header from "./Header";
import Hero from "./Hero";


const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Hero />
            { children }
        </>
    )
}

export default Layout;