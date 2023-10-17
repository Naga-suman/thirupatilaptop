import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import { Button } from '@mui/material';
import { Tooltip } from '@mui/material';

const ExportExcelFile= ({excelData, fileName}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension ='.xlsx';
    const exportToExcel= async() => {
        console.log('started to save file');
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: { 'data' : ws},SheetNames: ['data']};
        const excelBuffer= XLSX.write(wb, { bookType: 'xlsx', type: 'array'});
        const data = new Blob([excelBuffer], {type : fileType});
        FileSaver.saveAs(data,fileName+fileExtension)
    };

    return <>
            <Tooltip tittle='Excle Export'>
                <Button varient="contained" onClick={exportToExcel} color="primary" style = {{cursor: "pointer",fontSize:14}}>
                    Excel Export
                </Button>
            </Tooltip>
    </>


}


export default ExportExcelFile;