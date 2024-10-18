import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Licenca } from './licenca.entity';
import { CreateLicencaDto } from './create-licenca.dto'; // Import the DTO

@Injectable()
export class LicencaService {
  constructor(
    @InjectRepository(Licenca)
    private licencaRepository: Repository<Licenca>,
  ) {}

  // Regex to validate MAC address format
  private macRegex = /^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/;

  // Create a new license with validation and normalization
  async create(createLicencaDto: CreateLicencaDto): Promise<Licenca> {
    const { mac_address } = createLicencaDto;

    // Validar o formato do endereço MAC
    if (!this.macRegex.test(mac_address)) {
      throw new BadRequestException('Formato de endereço MAC inválido');
    }

    // Normalizar o endereço MAC para minúsculas antes de salvar
    const normalizedMac = mac_address.toLowerCase();

    // Criar a licença com o endereço MAC normalizado
    const licenca = this.licencaRepository.create({
      ...createLicencaDto,
      mac_address: normalizedMac,
    });

    return await this.licencaRepository.save(licenca);
  }

  // Find a license by MAC address (case-insensitive)
  async getByMacAddress(macAddress: string): Promise<Licenca | undefined> {
    const normalizedMac = macAddress.toLowerCase(); // Normalize to lowercase
    return await this.licencaRepository.findOne({
      where: { mac_address: normalizedMac },
    });
  }

  // Cancel a license (case-insensitive MAC address)
  async cancelLicense(macAddress: string): Promise<Licenca | undefined> {
    const licenca = await this.getByMacAddress(macAddress); // Reuse the method

    if (!licenca) {
      return undefined;
    }

    licenca.validade = false;
    return await this.licencaRepository.save(licenca);
  }

  // Activate a license (case-insensitive MAC address)
  async activateLicense(macAddress: string): Promise<Licenca | undefined> {
    const licenca = await this.getByMacAddress(macAddress); // Reuse the method

    if (!licenca) {
      return undefined;
    }

    if (licenca.validade) {
      return licenca; // Already active
    }

    licenca.validade = true;
    return await this.licencaRepository.save(licenca);
  }
}
