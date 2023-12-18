import React, {useEffect} from 'react';
import './Jobs.page.scss'
import httpModule from "../../helpers/http.module";
import {useState} from "react";
import {IJob} from "../../types/global.types";
import {Button, CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Add} from "@mui/icons-material";
import JobsComponent from "../../components/Jobs/Jobs.component";


const Jobs = () => {
    const [jobs, setJobs] = useState<IJob[]>([])
    const [loading, setLoading] = useState<Boolean>(false)
    const redirect = useNavigate()

    useEffect(() => {
        setLoading(true)
        httpModule
            .get<IJob[]>('/Job/Get')
            .then(res => {
                setJobs(res.data)
                setLoading(false)
            }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }, [])


    return (
        <div className="content jobs">
            <div className="heading">
                <h2>Jobs</h2>
                <Button variant="outlined" onClick={() => redirect("/jobs/add")}>
                    <Add/>
                </Button>
            </div>
            {loading ? <CircularProgress size={100}/> : jobs.length === 0 ? <h1>No Jobs</h1> :
                <JobsComponent data={jobs}/>}
        </div>
    );
};

export default Jobs;