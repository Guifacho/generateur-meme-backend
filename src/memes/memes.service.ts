import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meme } from './meme.entity';
import { CreateMemeDto } from './dto/create-meme.dto';
import { UpdateMemeDto } from './dto/update-meme.dto';

@Injectable()
export class MemesService {
  constructor(
    @InjectRepository(Meme)
    private readonly memeRepository: Repository<Meme>,
  ) {}

  async findAll() {
    return await this.memeRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const meme = await this.memeRepository.findOneBy({ id });
    if (!meme) throw new NotFoundException(`Mème avec l'ID ${id} introuvable`);
    return meme;
  }

  async create(dto: any) { // On utilise any ici car l'image est ajoutée manuellement dans le controller
    const newMeme = this.memeRepository.create(dto);
    return await this.memeRepository.save(newMeme);
  }

  // LA MÉTHODE MANQUANTE
  async update(id: string, dto: UpdateMemeDto) {
    // preload cherche l'entité par ID et "injecte" les nouvelles valeurs du DTO
    const meme = await this.memeRepository.preload({
      id: id,
      ...dto,
    });

    if (!meme) {
      throw new NotFoundException(`Impossible de mettre à jour : Mème ${id} introuvable`);
    }

    return await this.memeRepository.save(meme);
  }

  async remove(id: string) {
    const meme = await this.findOne(id);
    return await this.memeRepository.remove(meme);
  }
}