import { 
  Controller, Get, Post, Put, Delete, Param, Body, 
  UseInterceptors, UploadedFile, BadRequestException 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MemesService } from './memes.service';
import { CreateMemeDto } from './dto/create-meme.dto';
import { UpdateMemeDto } from './dto/update-meme.dto';

@Controller('api/memes')
export class MemesController {
  constructor(private readonly memesService: MemesService) {}

  @Get()
  async findAll() {
    return await this.memesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.memesService.findOne(id);
  }

  @Post()
  // On intercepte le champ 'image' du formulaire (multipart/form-data)
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads', // Le chemin vers le volume Docker
      filename: (req, file, cb) => {
        // On génère un nom unique : timestamp + extension d'origine
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: CreateMemeDto
  ) {
    if (!file) {
      throw new BadRequestException("L'image du mème est obligatoire");
    }

    // On injecte le nom du fichier enregistré dans le DTO avant de l'envoyer au service
    const memeData = {
      ...payload,
      image: file.filename, // C'est ici qu'on stocke juste le nom !
    };

    return await this.memesService.create(memeData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateMemeDto) {
    return await this.memesService.update(id, payload);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.memesService.remove(id);
  }
}