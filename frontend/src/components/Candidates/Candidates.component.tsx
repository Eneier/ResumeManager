import React from 'react';
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import {ICandidate} from "../../types/global.types";
import './Candidates.component.scss'
import {baseUrl} from "../../constants/url.constants";
import {PictureAsPdf} from "@mui/icons-material";
import {Button} from "@mui/material";

interface ICandidatesProps {
    data: ICandidate[],
    onDelete: (candidateId: number) => void;
}

const CandidatesComponent = ({data, onDelete}: ICandidatesProps) => {

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 100},
        {field: 'firstName', headerName: 'First Name', width: 120},
        {field: 'lastName', headerName: 'Last Name', width: 120},
        {field: 'email', headerName: 'Email', width: 200},
        {field: 'phone', headerName: 'Phone', width: 120},
        {
            field: 'resumeUrl', headerName: 'Download Resume', width: 150,
            renderCell: (params: GridRenderCellParams<any, Date>) =>
                (
                    <a href={`${baseUrl}/Candidate/download/${params.row.resumeUrl}`} download>
                        <PictureAsPdf />
                    </a>
                )
        },
        {
            field: 'delete', headerName: 'Delete', width: 75,
            renderCell: (params: GridRenderCellParams<any>) => (
                <Button variant="outlined" color="error" size="small" onClick={() => params.row.onDelete(params.row.id)}>Delete</Button>
            )
        },
    ]

    return (
        <Box sx={{width: '100%', height: 450}} className="candidates-grid">
            <DataGrid
                rows={data.map(candidate => ({ ...candidate, onDelete }))}
                columns={columns}
                getRowId={(row) => row.id}
                rowHeight={50}
            />

        </Box>
    );
};

export default CandidatesComponent;