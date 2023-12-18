import React from 'react';
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import {ICandidate} from "../../types/global.types";
import './Candidates.component.scss'
import {baseUrl} from "../../constants/url.constants";
import {PictureAsPdf} from "@mui/icons-material";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'firstName', headerName: 'First Name', width: 120},
    {field: 'lastName', headerName: 'Last Name', width: 120},
    {field: 'email', headerName: 'Email', width: 200},
    {field: 'phone', headerName: 'Phone', width: 120},
    {field: 'coverLetter', headerName: 'Cover Letter', width: 300},
    {
        field: 'resumeUrl', headerName: 'Download Resume', width: 150,
        renderCell: (params: GridRenderCellParams<any, Date>) =>
            (
                <a href={`${baseUrl}/Candidate/download/${params.row.resumeUrl}`} download>
                    <PictureAsPdf />
                </a>
            )
    },
]

interface ICandidatesProps {
    data: ICandidate[]
}

const CandidatesComponent = ({data}: ICandidatesProps) => {
    return (
        <Box sx={{width: '100%', height: 450}} className="candidates-grid">
            <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row) => row.id}
                rowHeight={50}
            />

        </Box>
    );
};

export default CandidatesComponent;