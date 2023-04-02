import "../assets/styles/components/Header.style.css";

const Header = () => {
    return (
    <>
        <header>
            <nav id="headerNav">
                <a>Todo</a>
                <ul className="nav-list">
                    <li className="nav-list-item ml-2">Home</li>
                    <li className="nav-list-item ml-2 mr-1">Profile</li>
                    <li className="nav-list-item ml-1 mr-1">Logout</li>
                </ul>
            </nav>
        </header>
    </>
    );
};

export default Header;