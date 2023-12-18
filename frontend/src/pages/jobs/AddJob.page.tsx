import React, {useEffect, useState} from 'react';
import {ICompany, ICreateJobDto} from "../../types/global.types";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import httpModule from "../../helpers/http.module";
import "./Jobs.page.scss"

let jobLevel: string[] = ['Intern', 'Junior', 'Middle', 'Senior', 'TeamLead', 'Cto', 'Architect']

const AddJob = () => {
    const [job, setJob] = useState<ICreateJobDto>({title: '', level: '', companyId: ''})
    const [companies, setCompanies] = useState<ICompany[]>([])

    useEffect(() => {
        httpModule
            .get<ICompany[]>('/Company/Get')
            .then(res => {
                setCompanies(res.data)
            }).catch(err => {
            console.log(err)
        })
    }, [])

    const redirect = useNavigate()

    const handleClickSaveBtn = () => {
        if (job.title === "" || job.level === "" || job.companyId === "") {
            alert("Fill all fields")
            return
        }
        httpModule.post("/Job/Create", job)
            .then(res => redirect("/jobs"))
            .catch(err => console.log(err))
    }

    const handleClickBackBtn = () => {
        redirect("/jobs")
    }

    return (
        <div className="content">
            <div className="add-job">
                <h2>Add New Job</h2>
                <TextField fullWidth className="dark-input"
                           autoComplete="off"
                           label="Job Title"
                           variant="outlined"
                           value={job.title}
                           onChange={(e) => setJob({...job, title: e.target.value})}
                />
                <FormControl fullWidth>
                    <InputLabel>Job Level</InputLabel>
                    <Select className="dark-input"
                            value={job.level}
                            label="Job Level"
                            onChange={(e) => setJob({...job, level: e.target.value})}
                    >
                        {jobLevel.map(item =>
                                <MenuItem
                                    key={item}
                                    value={item}>
                                    {item}
                                </MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Company</InputLabel>
                    <Select className="dark-input"
                            value={job.companyId}
                            label="Company"
                            onChange={(e) => setJob({...job, companyId: e.target.value})}
                    >
                        {companies.map(item =>
                            <MenuItem
                                key={item.id}
                                value={item.id}>
                                {item.name}
                            </MenuItem>)}
                    </Select>
                </FormControl>
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

export default AddJob;