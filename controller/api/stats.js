
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../model/User');


const locationStats = (user,locations) => {
    //add location to locations array if not added yet
    if (!locations[user.location]) {
      locations[user.location] = {
        userCount: 0,
        voted: 0
      }
    }
    //userCount for that particular location
    locations[user.location]['userCount'] += 1
    //vote count for that particular location
    if (user.voted) {
        locations[user.location]['voteCount'] += 1
        if(user.vote==1||user.vote==2){
            locations[user.location]['SentimentScore'] -= 1
        }
        else if(user.vote==4||user.vote==5){
            locations[user.location]['SentimentScore'] += 1
        }
        else if(user.vote==3){
            locations[user.location]['SentimentScore'] += 0
        }
    }
    else{
        locations[user.location]['SentimentScore'] += 0
    }
    
}

const departmentStats = (user,departments) => {
    //add department to departments array if not added yet
    if (!departments[user.department]) {
      departments[user.department] = {
        userCount: 0,
        voted: 0
      }
    }
    //userCount for that particular department
    departments[user.department]['userCount'] += 1
    //vote count for that particular department
    if (user.voted) {
        departments[user.department]['voted'] += 1
        if(user.vote==1||user.vote==2){
            departments[user.department]['SentimentScore'] -= 1
        }
        else if(user.vote==4||user.vote==5){
            departments[user.department]['SentimentScore'] += 1
        }
        else if(user.vote==3){
            departments[user.department]['SentimentScore'] += 0
        }
    }
    else {
        departments[user.location]['SentimentScore'] += 0
    }
    
}


const designationStats = (user,designations) => {
    //add designation to designations array if not added yet
    if (!designations[user.designation]) {
      designations[user.designation] = {
        userCount: 0,
        voted: 0
      }
    }
    //userCount for that particular designation
    designations[user.designation]['userCount'] += 1
    //vote count for that particular designation
    if (user.voted) {
        designations[user.designation]['voteCount'] += 1
        if(user.vote==1||user.vote==2){
            designations[user.designation]['SentimentScore'] -= 1
        }
        else if(user.vote==4||user.vote==5){
            designations[user.designation]['SentimentScore'] += 1
        }
        else if(user.vote==3){
            designations[user.designation]['SentimentScore'] += 0
        }
    }
    else{
        designations[user.designation]['SentimentScore'] += 0
    }
    
}


router.get('/location',async (req,res)=>{
    try {
       const users = await User.find().populate('username',['location','vote','voted'])
       let locations = {};
       users.forEach(user=>locationStats(user,locations));
       console.log(locations);
       res.json(locations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/department',async (req,res)=>{
    try {
       const users = await User.find().populate('id',['vote', 'department','voted'])
       let departments = {};
       users.forEach(user=>departmentStats(user,departments));
       res.json(departments); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/designation',async (req,res)=>{
    try {
       const users = await User.find().populate('id',['vote','designation','voted'])
       let designations = {};
       users.forEach(user=>designationStats(user,designations));
       res.json(designations); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        
    }
})

module.exports = router;