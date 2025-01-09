const launches= new Map();

let latestFlightNumber=100

const launch={
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('27 december,2030'),
    target: 'kepler-442 b',
    customer: ['NASA','ZTM'],
    upcoming: true,
    success:true
}

launches.set(launch.flightNumber, launch)

function existLaunchWithId(launchId){
    return launches.has(launchId);
}

function getAllLaunches(){
    return Array.from(launches.values());
}

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch,{
        flightNumber: latestFlightNumber,
        customer: ['Zero To Mastery', 'NASA'],
        upcoming: true,
        success:true,
    })
)
}

function abortLaunchById(launchId){
    const aborted= launches.get(launchId);
    aborted.upcoming= false;
    aborted.success= false;
    return aborted;
}

module.exports={
    existLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
};