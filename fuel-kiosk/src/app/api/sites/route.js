// app/api/sites/route.js

// Meant to be placeholder to just get all Bulk Fuel Sites

import { NextResponse } from 'next/server';

export async function GET() {
    // Simulate fuel sites data
    const fuelSites = [
        { value: 'site-1', label: 'ADMIN--FUEL SITE ADMINISTRATOR' },
        { value: 'site-2', label: 'CBARC-M--COLUMBIA BASIN AG RESEARCH-MOR' },
        { value: 'site-3', label: 'CBARC-P--COLUMBIA BASIN AG RESEARCH-PEN' },
        { value: 'site-4', label: 'COAREC--CENTRAL OREGON AG RES EXT' },
        { value: 'site-5', label: 'DAIRY--CORVALLIS' },
        { value: 'site-6', label: 'EOARC-B--EASTERN OREGON AG RESEARCH' },
        { value: 'site-7', label: 'EOARC-U--EASTERN OREGON AG RESEARCH' },
        { value: 'site-8', label: 'HAREC--HERMISTON AG RESEARCH STATION' },
        { value: 'site-9', label: 'KBREC--KLAMATH BASIN EXPERIMENT STA' },
        { value: 'site-10', label: 'MES--MALHEUR EXPERIMENT STATION' },
        { value: 'site-11', label: 'NWREC--NORTH WILLAMETTE RES EXTEN CTR' },
        { value: 'site12', label: 'SOREC--SOUTHERN OREGON RES EXT CTR' },
    ];

    // Return JSON response
    return NextResponse.json(fuelSites);
}

// Here is the query that is done for to get all bulk fuel sites from DB
// select LOC_loc_code, name, email_addr
// from LOC_MAIN 
// where (emsdba.LOC_MAIN.is_fuel_site = 'Y') 
// and loc_loc_code not in ('30','50')
// order by loc_loc_code;



