import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
// import CustomerIndex from './index'
import { Card} from '@mui/material';
import OuterDashboard from '../dashboard/Outletdashboard';
import { Grid } from '../../../node_modules/@mui/material/index';
import { useSelector } from 'react-redux';
import { GetFinancerSchemes } from '../../http/axioscalls';
import ExportExcelFile from '../../utils/excelfile-creater';

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  {
    field: 'schemeName',
    headerName: 'Scheme name',
    width: 150,
    editable: true,
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    width: 150,
    editable: true,
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    width: 150,
    editable: true,
  },
  {
    field: 'frequancy',
    headerName: 'Premimum Period',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'oneTimePremimumAmt',
    headerName: 'Premimum Amount',
    width: 110,
    editable: true,
  },
  {
    field: 'maturityAmt',
    headerName: 'Sum Assured',
    width: 110,
    editable: true,
  },
  
];



export default function ListViewGrid() {
  const logedUserId= useSelector((state) => state.login.userId);
  const [rows,setRows]= React.useState([]);


  React.useEffect(() => {
    GetFinancerSchemes(logedUserId).then((data) => { setRows(data.data)}).catch((ex) => console.log(ex));
  },[]);

  

  return (
   
   <>    <OuterDashboard activate='schemes'/>
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
               <ExportExcelFile excelData={rows}  fileName="Schemes-List"/>
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

