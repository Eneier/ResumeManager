import React from 'react';
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import moment from "moment";
import {IJob} from "../../types/global.types";
import './Jobs.component.scss'

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'title', headerName: 'Title', width: 300},
    {field: 'level', headerName: 'Level', width: 150},
    {field: 'companyName', headerName: 'Company Name', width: 150},
    {
        field: 'createdAt', headerName: 'Creation Date', width: 150,
        renderCell: (params: GridRenderCellParams<any, Date>) => moment(params.row.cretedAt).fromNow()
    },
]

interface IJobsProps {
    data: IJob[]
}

const JobsComponent = ({data} : IJobsProps) => {
    return (
        <Box sx={{width: '100%', height: 450}} className="jobs-grid">
            <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row) => row.id}
                rowHeight={50}
            />

        </Box>
    );
};

export default JobsComponent;