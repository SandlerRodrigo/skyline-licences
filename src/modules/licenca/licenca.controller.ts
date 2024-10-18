import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { LicencaService } from './licenca.service';
import { CreateLicencaDto } from './create-licenca.dto';

@Controller('licencas')
export class LicencaController {
  constructor(private readonly licencaService: LicencaService) {}

  @Post()
  async create(@Body() createLicencaDto: CreateLicencaDto) {
    return this.licencaService.create(createLicencaDto);
  }

  @Get(':mac_address')
  async getByMacAddress(@Param('mac_address') macAddress: string) {
    return this.licencaService.getByMacAddress(macAddress);
  }

  @Patch('cancelar/:mac_address')
  async cancelLicense(@Param('mac_address') macAddress: string) {
    const result = await this.licencaService.cancelLicense(macAddress);
    if (result) {
      return { message: 'License cancelled successfully', license: result };
    } else {
      return { message: 'License not found' };
    }
  }

  @Patch('ativar/:mac_address')
  async activateLicense(@Param('mac_address') macAddress: string) {
    const result = await this.licencaService.activateLicense(macAddress);
    if (result) {
      return { message: 'License activated successfully', license: result };
    } else {
      return { message: 'License not found or already active' };
    }
  }
}
