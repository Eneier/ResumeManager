import React from 'react';
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import moment from "moment";
import {ICompany} from "../../types/global.types";
import './Companies.component.scss'

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'name', headerName: 'Name', width: 200},
    {field: 'size', headerName: 'Size', width: 100},
    {
        field: 'createdAt', headerName: 'Creation Date', width: 150,
        renderCell: (params: GridRenderCellParams<any, Date>) => moment(params.row.cretedAt).format("YYYY-MM-DD")
    },
]

interface ICompaniesProps {
    data: ICompany[]
}

const CompaniesComponent = ({data} : ICompaniesProps) => {
    return (
        <Box sx={{width: '100%', height: 450}} className="companies-grid">
            <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row) => row.id}
                rowHeight={50}
            />

        </Box>
    );
};

export default CompaniesComponent;