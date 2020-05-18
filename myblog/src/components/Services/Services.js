import React from 'react';
import "./Services.css";
import { GrPersonalComputer } from "react-icons/gr";
import PropTypes from 'prop-types';

const Services = (props) => {
   return <section id="service" className="services-mf route">
   <div className="container">

     <div className="row">
       <div className="col-sm-12">
         <div className="title-box text-center">
           <h3 className="">
            
           </h3>
           
         </div>
       </div>
     </div>

     <div className="row">
        {props.services.map((data,index) => (
       <div key ={data.index} className="col-md-4">
         <div className="service-box">
           <div className="service-ico">
             <span className="ico-circle"><GrPersonalComputer /></span>
           </div>
           <div className="service-content">
<h2 className="s-title">{data.service_name}</h2>
             <p className="s-description text-center">
             {data.service_description}
             </p>
           </div>
         </div>
       </div>
        ))}
    </div>
   </div>
 </section>
}

Services.prototype = {
  services:PropTypes.object
}

export default Services;