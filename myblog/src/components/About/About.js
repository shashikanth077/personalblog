import React from 'react';
import "./About.css";
import ProgressBar from 'react-bootstrap/ProgressBar';

const About = (props) => {
   return <section id="about" className="about-mf sect-pt4 route">
   <div className="container">
     <div className="row">
       <div className="col-sm-12">
         <div className="box-shadow-full">
           <div className="row">
             <div className="col-md-6">
               <div className="row">
                 <div className="col-sm-6 col-md-5">
                   <div className="about-img">
                    <img width="200" height="" src={require('../../assets/images/bio.png')} />
                   </div>
                 </div>
                 <div className="col-sm-6 col-md-7">
                   <div className="about-info">
<p><span className="title-s">Name: </span> <span>{props.name}</span></p>
                     <p><span className="title-s">Profile: </span> <span>{props.designation}</span></p>
                     <p><span className="title-s">Email: </span> <span>{props.email}</span></p>
                     <p><span className="title-s">Phone: </span> <span>{props.phone}</span></p>
                   </div>
                 </div>
               </div>
               <div className="skill-mf">
                 <p className="title-s">Skill</p>
                 
                {props.skills.map(value => (
                  
                  <div>
                    <ProgressBar now={value.skill_rate} max="100" min="0" label={value.skill_name} />
                  </div>
                 
                ))}
                     
                  
              </div>
             </div>
             <div className="col-md-6">
               <div className="about-me pt-4 pt-md-0">
                 <div className="title-box-2">
                   <h5 className="title-left">
                     About me
                   </h5>
                 </div>
                 <p className="lead">
                   {props.description}
                 </p>
                 
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </section>
}

export default About;