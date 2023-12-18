import React, {useState} from 'react';
import {ICreateCompanyDto} from "../../types/global.types";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import httpModule from "../../helpers/http.module";
import "./Companies.page.scss"

const AddCompany = () => {
    const [company, setCompany] = useState<ICreateCompanyDto>({name: '', size: ''})

    const redirect = useNavigate()

    const handleClickSaveBtn = () => {
        if(company.name === "" || company.size === "") {
            alert("Fill all fields")
            return
        }
        httpModule.post("/Company/Create", company)
            .then(res => redirect("/companies"))
            .catch(err => console.log(err))
    }

    const handleClickBackBtn = () => {
        redirect("/companies")
    }

    return (
        <div className="content">
            <div className="add-company">
                <h2>Add New Company</h2>
                <TextField fullWidth className="dark-input"
                    autoComplete="off"
                    label="Company Name"
                    variant="outlined"
                    value={company.name}
                    onChange={(e) => setCompany({...company, name: e.target.value})}
                />
                <FormControl fullWidth>
                    <InputLabel>Company Size</InputLabel>
                    <Select className="dark-input"
                        value={company.size}
                        label="Company Size"
                        onChange={(e) => setCompany({...company, size: e.target.value})}
                    >
                        <MenuItem value="Small">Small</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Large">Large</MenuItem>
                    </Select>
                </FormControl>
                <div className="btns">
                    <Button className="dark-btn" variant="outlined" color="primary" onClick={handleClickSaveBtn}>Save</Button>
                    <Button className="dark-btn" variant="outlined" color="primary" onClick={handleClickBackBtn}>Back</Button>
                </div>
            </div>
        </div>
    );
};

export default AddCompany;