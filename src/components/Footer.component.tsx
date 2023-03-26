import "../assets/styles/components/Footer.style.css";

const Footer = () => {
    return (
    <>
        <nav id="footerNav">
            <p>Todo</p>
            <p>Version: {import.meta.env.VITE_VERSION_NUMBER}</p>
            <p>Last Updated: {import.meta.env.VITE_LAST_UPDATED}</p>
        </nav>
    </>
    );
};

export default Footer;