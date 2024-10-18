import { IsNotEmpty, IsString, IsDate, Matches } from 'class-validator';

export class CreateLicencaDto {
  @IsNotEmpty()
  @IsString()
  chave: string;

  @IsNotEmpty()
  @Matches(/^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/, {
    message: 'Invalid MAC address format',
  })
  mac_address: string;

  @IsNotEmpty()
  @IsDate()
  data_expiracao: Date;
}
