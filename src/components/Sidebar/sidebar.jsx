import React, { useState, useContext } from 'react';
import './sidebar.css';
import moon from '../../assets/moon-outline.svg'
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, previousPrompt, setRecentPrompt, newChat } = useContext(Context); // Corrected property names to match context
    const loadPrompt= async(prompt)=>{
        setRecentPrompt(prompt),
        await onSent(prompt)
    }

    const {darkMode,setDarkMode}=useState(false)
    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
        document.body.classList.toggle('dark-mode'); // Add or remove the class on the body
    };
    return (
        <div className="sidebar">
            <div className="top">
                <div className="top-icon">

                <img
                    className="menu"
                    onClick={() => setExtended((prev) => !prev)} // Toggle extended state
                    src={assets.menu_icon}
                    alt=""
                />
                <div className='Dark-mode dark-mode'>

                    <ion-icon name="moon-outline"><img onClick={()=>setDarkMode(true)} src={moon} alt="Dark Mode Toggle" />
                    </ion-icon>
                    {extended ? <p>Dark Mode</p> : null}
                </div>
                </div>
                <div onClick={()=>newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ? (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {previousPrompt.map((item, index) => (
                            <div onClick={()=>loadPrompt(item)} className="recent-entry" key={index}>
                                <img src={assets.message_icon} alt="" />
                                <p>{item.slice(0,18)}</p>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Setting</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
