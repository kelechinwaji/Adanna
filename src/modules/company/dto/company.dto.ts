import { IsNotEmpty, IsString } from 'class-validator';

export class CompanyDTO {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  numberOfUser: number;

  @IsNotEmpty()
  @IsString()
  numberOfProduct: number;
}
