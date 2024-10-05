# CS 461-463 Senior Capstone at Oregon State University

Fuel kiosk data collection at remote bulk fuel sites throughout Oregon (CS Team)

The Motor Pool seeks to identify a team of engineering students to engage in a design/build project that creates a low-cost standalone data collection system that:

- Remotely captures fuel transaction information through a simple user interface while also validating the data and identifying discrepancies.
- The remote solution needs to withstand temperature extremes and dusty environments while remaining in compliance with any relevant legal codes.
- System components need to be easy to repair or replace to minimize downtime and travel.

### Objectives
Evaluate existing web application and select viable opportunities to:

- Reduce user data entry steps
- Evaluate Bluetooth or wireless methods to synchronously read pump flow information and/or allow/prevent pump operation
- Write data to local datastore for batch processing when data connectivity is unavailable
- Remote into device for system updates

### Motivations
OSU operates large scale agricultural research stations throughout the state. Vehicles, tractors and other heavy equipment require on-farm fueling year-round for multiple fuel types. Systems currently in place have no real-time data collection or validation and require multiple manual data entry steps and manual reconciliation. These practices are labor intensive for station personnel, produce time lags in record keeping, and miss identifying data inconsistencies or theft.

A prototype fuel kiosk was developed internally in September of 2023 to collect data at the time of fueling and store it in the cloud. An Android tablet with 3G connection was mounted inside a waterproof enclosure to act as the user interface. The kiosk records transactions from user entry through a simple web application. The enclosure attempts to use thermoelectric heating and cooling the keep the tablet's lithium battery in a safe operating range. 

While in use at a local site this system has met many original project goals, but it is vulnerable to fluctuating seasonal temperatures, intermittent 3G wireless connectivity, and other downtime causes which could require travel to distant remote sites for maintenance or replacement if deployed statewide.

Without a reliable real-time data collection method for fuel monitoring:

- Current fuel sites lack adequate controls over fuel use and may fail to meet university policy requirements.
- Fuel inventory discrepancies can't be resolved in a timely way leading to confusion over what is theft or accidental omission.
- Fuel costs end up being carried by central farm administration rather than being charged out to projects or specific grants increasing farm overhead.
- Manual data collection is often skipped because of labor intensity.
    
