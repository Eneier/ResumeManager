import React, {useEffect} from 'react';
import './Companies.page.scss'
import httpModule from "../../helpers/http.module";
import {useState} from "react";
import {ICompany} from "../../types/global.types";
import {Button, CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Add} from "@mui/icons-material";
import CompaniesComponent from "../../components/Companies/Companies.component";


const Companies = () => {
    const [companies, setCompanies] = useState<ICompany[]>([])
    const [loading, setLoading] = useState<Boolean>(false)
    const redirect = useNavigate()

    useEffect(() => {
        setLoading(true)
        httpModule
            .get<ICompany[]>('/Company/Get')
            .then(res => {
                setCompanies(res.data)
                setLoading(false)
            }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }, [])


    return (
        <div className="content companies">
            <div className="heading">
                <h2>Companies</h2>
                <Button variant="outlined" onClick={() => redirect("/companies/add")}>
                    <Add/>
                </Button>
            </div>
            {loading ? <CircularProgress size={100}/> : companies.length === 0 ? <h1>No Company</h1> :
                <CompaniesComponent data={companies}/>}
        </div>
    );
};

export default Companies;