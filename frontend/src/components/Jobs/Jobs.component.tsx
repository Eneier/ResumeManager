import React from 'react';
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import moment from "moment";
import {IJob} from "../../types/global.types";
import './Jobs.component.scss'
import {Button} from "@mui/material";


interface IJobsProps {
    data: IJob[],
    onDelete: (jobId: number) => void;
}

const JobsComponent = ({data, onDelete } : IJobsProps) => {

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 50},
        {field: 'title', headerName: 'Title', width: 200},
        {field: 'level', headerName: 'Level', width: 100},
        {field: 'companyName', headerName: 'Company Name', width: 150},
        {
            field: 'createdAt', headerName: 'Creation Date', width: 150,
            renderCell: (params: GridRenderCellParams<any, Date>) => moment(params.row.cretedAt).fromNow()
        },
        {
            field: 'delete', headerName: 'Delete', width: 75,
            renderCell: (params: GridRenderCellParams<any>) => (
                <Button variant="outlined" color="error" size="small" onClick={() => params.row.onDelete(params.row.id)}>Delete</Button>
            )
        },
    ]

    return (
        <Box sx={{width: '100%', height: 450}} className="jobs-grid">
            <DataGrid
                rows={data.map(job => ({ ...job, onDelete }))}
                columns={columns}
                getRowId={(row) => row.id}
                rowHeight={50}
            />

        </Box>
    );
};

export default JobsComponent;