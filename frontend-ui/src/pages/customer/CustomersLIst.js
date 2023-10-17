import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
// import CustomerIndex from './index'
import { Card} from '@mui/material';
import OuterDashboard from '../dashboard/Outletdashboard';
import { Grid } from '../../../node_modules/@mui/material/index';
import { useSelector } from 'react-redux';
import { GetFinancerCustomers } from '../../http/axioscalls';

import ExportExcelFile from '../../utils/excelfile-creater';


const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  {
    field: 'firstname',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastname',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email Id',
    width: 150,
    editable: true,
  },
  {
    field: 'mobile',
    headerName: 'Mobile',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'isActive',
    headerName: 'Is Active',
    width: 110,
    editable: true,
  },
  {
    field: 'houseNo',
    headerName: 'House No',
    width: 110,
    editable: true,
  },
  {
    field: 'village',
    headerName: 'Village / Town',
    width: 110,
    editable: true,
  },
  {
    field: 'district',
    headerName: 'District',
    width: 110,
    editable: true,
  },
  {
    field: 'state',
    headerName: 'State',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'additionalData',
    headerName: 'Additional Data',
    sortable: false,
    width: 160,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];



export default function ListViewGrid() {
  const logedUserId= useSelector((state) => state.login.userId);
  const [rows,setRows]= React.useState([]);


  React.useEffect(() => {
    GetFinancerCustomers(logedUserId).then((data) => { setRows(data.data)}).catch((ex) => console.log(ex));
  },[]);

  

  return (
   
   <>    <OuterDashboard activate='customers'/>
  
        <Box 
        sx={{ 
            p:10,
            minWidth: 200, 
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
            m: 1,
            
        } 
            }}>
               <ExportExcelFile excelData={rows}  fileName="custer-List"/>
            <Card>
           
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 15,
                        },
                    },
                    }}
                    pageSizeOptions={[15]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
                </Grid>   
                
            </Grid>
            </Card>
            
       
        </Box>
        </> 
    
  );
}

