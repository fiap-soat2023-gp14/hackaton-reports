
export class TimeSheetDTO {

  records: Record[];
  totalHours: number;
  employeeId: string;

}

export class Record {
  date: string;
  hour: string;
  type: string;
}

