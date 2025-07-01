import profile from '../assets/images/profile.jpg'
import logo from '../assets/images/logo.png'
import DashboardAction from '../utils/dashboard.action';

export function Dashboard() {
    const {isMenuToggled, signOut, toggleDarkBody, toggleMenu} = DashboardAction()

    return <>
        <nav className={isMenuToggled ? 'close':''}>
            <div className="menu-container">
                <div className="logo-name">
                    <div className="logo-image">
                        <img src={logo} alt=""/>
                    </div>
                    <span className="logo_name">Oauth2</span>
                </div>

                <div className="menu-items">
                    <ul className="nav-links">
                        <li>
                            <a href="#">
                                <i className="uil uil-estate"></i>
                                <span className="link-name">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="uil uil-files-landscapes"></i>
                                <span className="link-name">Content</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="uil uil-chart"></i>
                                <span className="link-name">Analytics</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="uil uil-thumbs-up"></i>
                                <span className="link-name">Like</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="uil uil-comments"></i>
                                <span className="link-name">Comments</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="uil uil-share"></i>
                                <span className="link-name">Share</span>
                            </a>
                        </li>
                    </ul>
                    <ul className="logout-mode">
                        <li>
                            <a href="#" className="signout" onClick={signOut}>
                                <i className="uil uil-signout"></i>
                                <span className="link-name">Logout</span>
                            </a>
                        </li>
                        <li className="mode">
                            <a href="#">
                                <i className="uil uil-moon"></i>
                                <span className="link-name">Dark Mode</span>
                            </a>
                            <div className="mode-toggle" onClick={toggleDarkBody}>
                                <span className="switch"></span>
                            </div>
                            
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <section className="dashboard">
            <div className="top">
                <i className="uil uil-bars sidebar-toggle" onClick={toggleMenu}></i>
                <div className="search-box">
                    <i className="uil uil-search"></i>
                    <input type="text" placeholder="Search here..."/>
                </div>

                <img src={profile} alt=""/>
            </div>

            <div className="dash-content">
                <div className="overview">
                    <div className="title">
                        <i className="uil uil-tachometer-fast-alt"></i>
                        <span className="text">Dashboard</span>
                    </div>

                    <div className="boxes">
                        <div className="box box1">
                            <i className="uil uil-thumbs-up"></i>
                            <span className="text">Total Likes</span>
                            <span className="number">50,120</span>
                        </div>
                        <div className="box box2">
                            <i className="uil uil-comments"></i>
                            <span className="text">Total Comments</span>
                            <span className="number">20,120</span>
                        </div>
                        <div className="box box3">
                            <i className="uil uil-share"></i>
                            <span className="text">Total Share</span>
                            <span className="number">10,120</span>
                        </div>
                    </div>
                </div>

                <div className="activity">
                    <div className="title">
                        <i className="uil uil-clock-three"></i>
                        <span className="text">Recent Activity</span>
                    </div>

                    <div className="activity-data">
                        <div className="data names">
                            <span className="data-title">
                                Name
                            </span>
                            <span className="data-list">Rizal Safril</span>
                            <span className="data-list">Rizal Safril</span>
                            <span className="data-list">Rizal Safril</span>
                            <span className="data-list">Rizal Safril</span>
                        </div>
                        <div className="data email">
                            <span className="data-title">
                                Email
                            </span>
                            <span className="data-list">rzmobiledev@gmail.com</span>
                            <span className="data-list">rzmobiledev@gmail.com</span>
                            <span className="data-list">rzmobiledev@gmail.com</span>
                            <span className="data-list">rzmobiledev@gmail.com</span>
                        </div>
                        <div className="data joined">
                            <span className="data-title">
                                Joined
                            </span>
                            <span className="data-list">2022-02-12</span>
                            <span className="data-list">2022-02-12</span>
                            <span className="data-list">2022-02-12</span>
                            <span className="data-list">2022-02-12</span>
                        </div>
                        <div className="data type">
                            <span className="data-title">
                                Type
                            </span>
                            <span className="data-list">New</span>
                            <span className="data-list">New</span>
                            <span className="data-list">New</span>
                            <span className="data-list">New</span>
                        </div>
                        <div className="data status">
                            <span className="data-title">
                                Status
                            </span>
                            <span className="data-list">Liked</span>
                            <span className="data-list">Liked</span>
                            <span className="data-list">Liked</span>
                            <span className="data-list">Liked</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}