const express= require('express')

const { getAllLaunches, addNewLaunch, existLaunchWithId, abortLaunchById }= require('../../models/launches.models')

function httpGetAllLaunches(req,res){
    return res.status(200).json(getAllLaunches())
}

function httpAddNewLaunch(req,res){
    const launch= req.body;
    console.log(launch);
    

    if(!launch.launchDate || !launch.mission || !launch.target || !launch.rocket){
        return res.status(400).json({
            Error: "Missing required launch property!!"
        })
    }
    
    launch.launchDate = new Date(launch.launchDate)
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            Error: "Invalid launch date!!"
        })
    }
    addNewLaunch(launch)

    return res.status(201).json(launch)
}

function httpAbortLaunch(req,res){
    const launchId= Number(req.params.id);

    if(!existLaunchWithId){
        return res.status(404).json({
            error: 'Launch not found'
        })
    }
    
    const aborted= abortLaunchById(launchId);
    return res.status(200).json(aborted);
}

module.exports= {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}