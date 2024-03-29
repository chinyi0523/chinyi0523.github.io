import React, { Component } from 'react';
import './About.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { NavBar } from '../component/AppBar';
import Footer from '../component/Footer/Footer'
class About extends Component{
    render(){
        return (
        <div>
        <div className="About_container">
            <div className = "About_content_wrap">
            <NavBar/>
            <div id = "About_space"></div>
            <div id="About_up">
                <h1 id="About_up_text">
                    Welcome to NTUEE+
                </h1>
            </div>
            <div id="About_down">
                <p id="About_down_text">
                    我們希望這個聯絡網能成為<br/>
                    一個整合式的社群網路，<br/>
                    讓NTUEErs聚在一起；<br/>
                    秉持著恢復人脈網的精神，<br/>
                    讓NTUEE能在世界上有更大的影響力；<br/>
                    建立一個連結電機系的共同回憶，<br/>
                    讓系友們有專屬的家！
                </p>
            </div>
            <Link id="About_join" to="/Login"><Button id="About_join_btn">JOIN US</Button></Link>
            
            </div>
            
        </div>
            <Footer/>
        </div>
        
        )
    }
}

export default About;
