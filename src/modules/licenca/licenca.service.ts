import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Licenca } from './licenca.entity';
import { CreateLicencaDto } from './create-licenca.dto';

@Injectable()
export class LicencaService {
  constructor(
    @InjectRepository(Licenca)
    private licencaRepository: Repository<Licenca>,
  ) {}

  private macRegex = /^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/;

  async create(createLicencaDto: CreateLicencaDto): Promise<Licenca> {
    const { mac_address } = createLicencaDto;

    if (!this.macRegex.test(mac_address)) {
      throw new BadRequestException('Formato de endereço MAC inválido');
    }

    const normalizedMac = mac_address.toLowerCase();

    const licenca = this.licencaRepository.create({
      ...createLicencaDto,
      mac_address: normalizedMac,
    });

    return await this.licencaRepository.save(licenca);
  }

  async getByMacAddress(macAddress: string): Promise<Licenca | undefined> {
    const normalizedMac = macAddress.toLowerCase();
    return await this.licencaRepository.findOne({
      where: { mac_address: normalizedMac },
    });
  }

  async cancelLicense(macAddress: string): Promise<Licenca | undefined> {
    const licenca = await this.getByMacAddress(macAddress);

    if (!licenca) {
      return undefined;
    }

    licenca.validade = false;
    return await this.licencaRepository.save(licenca);
  }

  async activateLicense(macAddress: string): Promise<Licenca | undefined> {
    const licenca = await this.getByMacAddress(macAddress);

    if (!licenca) {
      return undefined;
    }

    if (licenca.validade) {
      return licenca;
    }

    licenca.validade = true;
    return await this.licencaRepository.save(licenca);
  }
}
