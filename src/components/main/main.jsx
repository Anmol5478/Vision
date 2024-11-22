import React, { useContext } from 'react'
import "./main.css"
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

const main = () => {
  const{onSent,recentPrompt,showResult,loading,resultData,setInput,input}= useContext(Context)
  return (
    <div className="main">
        <div className="nav">
            <p>Vision</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
          {!showResult?<>
            <div className="greet">
                <p><span>Hello Anmol!</span>
                </p>
                <p>How can i help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                  <p>Suggest Beautiful places to see on an upcomming holidays</p>
                  <img src={assets.compass_icon} alt="" />
                  </div>
                  <div className="card">
                  <p>Briefly summarize this concept :UrbanClap</p>
                  <img src={assets.bulb_icon} alt="" />
                  </div>
                  <div className="card">
                  <p>Brainstoming team bonding activities</p>
                  <img src={assets.message_icon} alt="" />
                  </div>
                  <div className="card">
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum praesentium at odit, cupiditate modi nemo esse harum nam ratione maiores.</p>
                  <img src={assets.code_icon} alt="" />
                  </div>
            </div>
          </>:
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p >{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading?
              <div className="loader">
                <hr />
                <hr />
                <hr />
              </div>
              :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
            }
            </div>
          </div>
          
          }

            <div className="main-bottom">
              <div className="search-box">
                <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter Prompt here' />
                <div>
                  <img src={assets.gallery_icon} alt="" />
                  <img src={assets.mic_icon} alt="" />
                  {input?<img src={assets.send_icon} onClick={()=>onSent()} alt="" />:null}
                </div>
              </div>
              <p className="bottom-info">
                Gemini may display inaccurate info, including about people so double check its responce. Your privacy and gemini
              </p>
            </div>
        </div>
    </div>
  )
}

export default main