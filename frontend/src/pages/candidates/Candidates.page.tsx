import React, {useEffect} from 'react';
import './Candidates.page.scss'
import httpModule from "../../helpers/http.module";
import {useState} from "react";
import {ICandidate} from "../../types/global.types";
import {Button, CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Add} from "@mui/icons-material";
import CandidatesComponent from "../../components/Candidates/Candidates.component";


const Candidates = () => {
    const [candidates, setCandidates] = useState<ICandidate[]>([])
    const [loading, setLoading] = useState<Boolean>(false)
    const redirect = useNavigate()

    useEffect(() => {
        setLoading(true)
        httpModule
            .get<ICandidate[]>('/Candidate/Get')
            .then(res => {
                setCandidates(res.data)
                setLoading(false)
            }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }, [])

    return (
        <div className="content candidates">
            <div className="heading">
                <h2>Jobs</h2>
                <Button variant="outlined" onClick={() => redirect("/candidates/add")}>
                    <Add/>
                </Button>
            </div>
            {loading ? <CircularProgress size={100}/> : candidates.length === 0 ? <h1>No Candidates</h1> :
                <CandidatesComponent data={candidates}/>}
        </div>
    );
};

export default Candidates;