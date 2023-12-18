import React, {useEffect, useState} from 'react';
import {ICreateCandidateDto, IJob} from "../../types/global.types";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import httpModule from "../../helpers/http.module";
import "./Candidates.page.scss"


const AddCandidate = () => {
    const [candidate, setCandidate] = useState<ICreateCandidateDto>(
        {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            coverLetter: '',
            jobId: ''
        })
    const [jobs, setJobs] = useState<IJob[]>([])
    const [pdfFile, setPdfFile] = useState<File | null>(null)

    useEffect(() => {
        httpModule
            .get<IJob[]>('/Job/Get')
            .then(res => {
                setJobs(res.data)
            }).catch(err => {
            console.log(err)
        })
    }, [])

    const redirect = useNavigate()

    const handleClickSaveBtn = () => {
        if (candidate.firstName === "" ||
            candidate.lastName === "" ||
            candidate.email === "" ||
            candidate.phone === "" ||
            candidate.coverLetter === "" ||
            candidate.jobId === "" ||
            !pdfFile)
        {
            alert("Fill all fields")
            return
        }
        const candidateFormData = new FormData()
        candidateFormData.append("firstName", candidate.firstName);
        candidateFormData.append("lastName", candidate.lastName);
        candidateFormData.append("email", candidate.email);
        candidateFormData.append("phone", candidate.phone);
        candidateFormData.append("coverLetter", candidate.coverLetter);
        candidateFormData.append("jobId", candidate.jobId);
        candidateFormData.append("pdfFile", pdfFile);
        httpModule.post("/Candidate/Create", candidateFormData)
            .then(res => redirect("/candidates"))
            .catch(err => console.log(err))
    }

    const handleClickBackBtn = () => {
        redirect("/candidates")
    }

    return (
        <div className="content">
            <div className="add-candidate">
                <h2>Add New Candidate</h2>
                <FormControl fullWidth>
                    <InputLabel>Job</InputLabel>
                    <Select className="dark-input"
                            value={candidate.jobId}
                            label="Job"
                            onChange={(e) => setCandidate({...candidate, jobId: e.target.value})}
                    >
                        {jobs.map(job =>
                            <MenuItem
                                key={job.id}
                                value={job.id}>
                                {job.title}
                            </MenuItem>)}
                    </Select>
                </FormControl>
                <TextField fullWidth className="dark-input"
                           autoComplete="off"
                           label="First Name"
                           variant="outlined"
                           value={candidate.firstName}
                           onChange={(e) => setCandidate({...candidate, firstName: e.target.value})}
                />
                <TextField fullWidth className="dark-input"
                           autoComplete="off"
                           label="Last Name"
                           variant="outlined"
                           value={candidate.lastName}
                           onChange={(e) => setCandidate({...candidate, lastName: e.target.value})}
                />
                <TextField fullWidth className="dark-input"
                           autoComplete="off"
                           label="Email"
                           variant="outlined"
                           value={candidate.email}
                           onChange={(e) => setCandidate({...candidate, email: e.target.value})}
                />
                <TextField fullWidth className="dark-input"
                           autoComplete="off"
                           label="Phone"
                           variant="outlined"
                           value={candidate.phone}
                           onChange={(e) => setCandidate({...candidate, phone: e.target.value})}
                />
                <TextField fullWidth className="dark-input"
                           autoComplete="off"
                           multiline
                           label="Cover Letter"
                           variant="outlined"
                           value={candidate.coverLetter}
                           onChange={(e) => setCandidate({...candidate, coverLetter: e.target.value})}
                />
                <Button
                    fullWidth
                    className="dark-btn"
                    variant="contained"
                    component="label"
                >
                    Upload File
                    <input
                        type="file"
                        onChange={event => setPdfFile(event.target.files?.[0] || null)}
                        hidden
                    />
                </Button>


                <div className="btns">
                    <Button className="dark-btn" variant="outlined" color="primary"
                            onClick={handleClickSaveBtn}>Save</Button>
                    <Button className="dark-btn" variant="outlined" color="primary"
                            onClick={handleClickBackBtn}>Back</Button>
                </div>
            </div>
        </div>
    );
};

export default AddCandidate;