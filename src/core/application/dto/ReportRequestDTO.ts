import { IsNotEmpty, IsString } from 'class-validator';


export class ReportRequestDTO {
  month: string;
  year: string;
  email: string;
  employeeId: string;
}