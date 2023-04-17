import * as FileSaver from 'file-saver';

export class XlsxHelper {

    public static exportArrayToExcel(arrayData: any[], heading: string[], fileName: string): void {
        import("xlsx").then(xlsx => {
            let worksheet = xlsx.utils.json_to_sheet([]);
            worksheet = xlsx.utils.sheet_add_aoa(worksheet, [heading], { cellStyles: true });
            worksheet = xlsx.utils.sheet_add_json(worksheet, arrayData, { origin: 'A2', skipHeader: true });
            worksheet["!cols"] = this.fitToColumn(arrayData, heading);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, fileName)
          });
    }

    public static saveAsExcelFile(buffer: any, fileName: string): void {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    }

    private static fitToColumn(arrayData: any[], heading: string[]): any {
        if (!arrayData){
            return undefined;
        }
        let arrayOfArrays = arrayData.map(item => Object.values(item));
        arrayOfArrays.push(heading);
        arrayOfArrays = arrayOfArrays[0].map((_, colIndex) => arrayOfArrays.map(row => row[colIndex]));
        let maxes = arrayOfArrays.map((array, i)  => Math.max(...array.map((item: any) => item?.toString()?.length ?? 0)));
        return  maxes.map(item => ({ wch: item }))
    }

}
