
export class TimeSheetDTO {

  records: Record[];
  totalHours: string;
  employeeId: string;

}

export class Record {
  date: string;
  hour: string;
  type: string;
}

