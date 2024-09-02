import React, { Fragment, useEffect, useState } from 'react'
import GoalLiveData from './GoalLiveData';
import BodyLiveData from './BodyLiveData';
import { useHistory } from "react-router-dom";
import NavBar from "./components/NavBar";
import './analysis.css';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import color from "../config/color";
import { useTranslation } from 'react-i18next';

function Analysis() {
    const {t} = useTranslation('global');
    const handle = useFullScreenHandle();
    const [username, setUsername] = useState("");
    const history = useHistory();
    const [type,setType] = useState("goal");
    const [goalbtnColor,setGoalbtnColor] = useState('btn-activate');
    const [bodybtnColor,setBodybtnColor] = useState('btn-normal');
    const [userRole,setUserRole] = useState();

    useEffect(() => {
        const userName = localStorage.getItem("userName");
        const userRole = localStorage.getItem("userRole");
        
        if (userName == undefined || userRole > 2) {
            history.push("/");
        }
        setUsername(userName);
        setUserRole(userRole);
        //getCustomer();
    }, []);


    const handleOnClick = (type) => {
         setType(type);
         if (type == 'goal'){
            setGoalbtnColor('btn-activate');
            setBodybtnColor('btn-normal');
         }else{
            setGoalbtnColor('btn-normal');
            setBodybtnColor('btn-activate');
         }
    }

    return (
        <div>
            <NavBar username={username} analysiscolor={"link-btn-active"} userRole={userRole} />
           
            <button onClick={handle.enter} className='btn btn-light' style={{ float: 'right' }}>
                <i className="fa-solid fa-maximize" style={{ color: 'gray', fontSize: '1.2rem' }}></i>
            </button>

            <FullScreen handle={handle}>

            {/* <div className="d-flex justify-content-center">
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className={goalbtnColor} onClick={()=>handleOnClick('goal')}>Goal Live Data</button>
                <button type="button" className={bodybtnColor} onClick={()=>handleOnClick('body')}>Body Live Data</button>
            </div>
            </div> */}
            {/* {type == 'goal' ?  <GoalLiveData /> :  <BodyLiveData />} */}

                <div style={{ background: handle.active ? "#fff" : null, height: handle.active ? '100%' : null }}>
                <span className="site-header" style={{color:color['dark'].main}}>{t('analysis')}</span>
                    { handle.active ?
                        <button onClick={handle.exit} className='btn btn-light' style={{ position: 'absolute',top : 0 ,right : 0 }}>
                            <i className="fa-solid fa-minimize" style={{ color: 'gray', fontSize: '1.2rem' }}></i>
                        </button> : null
                    }
                    <BodyLiveData t={t}/>
                </div>
            </FullScreen>
        </div>
    )
}

const data = [
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Barcelona",
        "awayTeam": "Real Betis",
        "homeAmount": 50000,
        "awayAmount": 3000,
        "bodyAmount": 47000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": "87878787",
        "eventTime": "2023-03-31 12:00:000"
    },
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Elche",
        "awayTeam": "Cadiz",
        "homeAmount": 30000,
        "awayAmount": 20000,
        "bodyAmount": 10000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": "56565656565",
        "eventTime": "2023-03-31 12:00:000"
    },
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Barcelona",
        "awayTeam": "Real Betis",
        "homeAmount": 30000,
        "awayAmount": 20000,
        "bodyAmount": 10000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": "777777777",
        "eventTime": "2023-03-31 12:00:000"
    },
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Barcelona",
        "awayTeam": "Real Betis",
        "homeAmount": 50000,
        "awayAmount": 3000,
        "bodyAmount": 47000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": "22222222222",
        "eventTime": "2023-03-31 12:00:000"
    },
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Barcelona",
        "awayTeam": "Real Betis",
        "homeAmount": 50000,
        "awayAmount": 3000,
        "bodyAmount": 47000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": 1111111111,
        "eventTime": "2023-03-31 12:00:000"
    },
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Barcelona",
        "awayTeam": "Real Betis",
        "homeAmount": 50000,
        "awayAmount": 3000,
        "bodyAmount": 47000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": 2323232323,
        "eventTime": "2023-03-31 12:00:000"
    },
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Barcelona",
        "awayTeam": "Real Betis",
        "homeAmount": 50000,
        "awayAmount": 3000,
        "bodyAmount": 47000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": 343434343,
        "eventTime": "2023-03-31 12:00:000"
    },
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Barcelona",
        "awayTeam": "Real Betis",
        "homeAmount": 50000,
        "awayAmount": 3000,
        "bodyAmount": 47000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": 999999999,
        "eventTime": "2023-03-31 12:00:000"
    },
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Barcelona",
        "awayTeam": "Real Betis",
        "homeAmount": 50000,
        "awayAmount": 3000,
        "bodyAmount": 47000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": 676767676,
        "eventTime": "2023-03-31 12:00:000"
    },
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Barcelona",
        "awayTeam": "Real Betis",
        "homeAmount": 50000,
        "awayAmount": 3000,
        "bodyAmount": 47000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": 343434343,
        "eventTime": "2023-03-31 12:00:000"
    },
]

export default Analysis
