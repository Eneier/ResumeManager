import React from 'react';
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import moment from "moment";
import {ICompany} from "../../types/global.types";
import './Companies.component.scss'
import {Button} from "@mui/material";

interface ICompaniesProps {
    data: ICompany[],
    onDelete: (companyId: number) => void;
}

const CompaniesComponent = ({data, onDelete } : ICompaniesProps) => {

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 50},
        {field: 'name', headerName: 'Name', width: 100},
        {field: 'size', headerName: 'Size', width: 75},
        {
            field: 'createdAt', headerName: 'Creation Date', width: 100,
            renderCell: (params: GridRenderCellParams<any, Date>) => moment(params.row.cretedAt).format("YYYY-MM-DD")
        },
        {
            field: 'delete', headerName: 'Delete', width: 75,
            renderCell: (params: GridRenderCellParams<any>) => (
                <Button variant="outlined" color="error" size="small" onClick={() => params.row.onDelete(params.row.id)}>Delete</Button>
            )
        },
    ]

    return (
        <Box sx={{width: '100%', height: 450}} className="companies-grid">
            <DataGrid
                rows={data.map(company => ({ ...company, onDelete }))}
                columns={columns}
                getRowId={(row) => row.id}
                rowHeight={50}
            />

        </Box>
    );
};

export default CompaniesComponent;