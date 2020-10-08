const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const config = require('config');

router.get('/location',(req,res,next)=>{
    axios.get(`${config.get('webAddress')}/api/stats/location`)
    .then(response=>{
        let locations = Object.keys(response.data);
        let locationsArray = [];
        for(let i=0;i<locations.length;i++){
            locationsArray[i] = [locations[i],response.data[locations[i]].voted,response.data[locations[i]].userCount,response.data[locations[i]].sentimentScore]
        }
        console.log(locationsArray)
        res.render('stats/bylocation',{pageTitle: "Location voting stats", path: '/stats/location', data:locationsArray});
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/designation',(req,res,next)=>{
    axios.get(`${config.get('webAddress')}/api/stats/designation`)
    .then(response=>{
        let designations = Object.keys(response.data);
        let designationsArray = [];
        for(let i=0;i<designations.length;i++){
            designationsArray[i] = [designations[i],response.data[designations[i]].voted,response.data[designations[i]].userCount,response.data[designations[i]].sentimentScore]
        }
        console.log(designationsArray);
        res.render('stats/bydesignation',{pageTitle: "Designation voting stats", path: '/stats/designation',data:designationsArray});
    })
    .catch(err=>{
        console.log(err) 
    })    
    
})

router.get('/department',(req,res,next)=>{
    axios.get(`${config.get('webAddress')}/api/stats/department`)
    .then(response=>{
        let departments = Object.keys(response.data);
        let departmentsArray = [];
        for(let i=0;i<departments.length;i++){
            departmentsArray[i] = [departments[i],response.data[departments[i]].voted,response.data[departments[i]].userCount,response.data[departments[i]].sentimentScore]
        }
        console.log(departmentsArray);
        res.render('stats/bydepartment',{pageTitle: "Department voting stats", path: '/stats/department',data:departmentsArray});
    
    }).catch(err=>{
        console.log(err)
    })     
})




module.exports = router;