import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemesController } from './memes.controller';
import { MemesService } from './memes.service';
import { Meme } from './meme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meme])], // On enregistre l'entité ici
  controllers: [MemesController],
  providers: [MemesService],
})
export class MemesModule {}