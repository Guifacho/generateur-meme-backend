import { IsString, IsArray, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMemeDto {
  @IsString()
  title: string;

  @IsOptional()
  @Transform(({ value }) => {
    // Si c'est déjà un objet/tableau (rare en form-data)
    if (typeof value !== 'string') return value;
    
    try {
      // On essaie de parser
      return JSON.parse(value);
    } catch (e) {
      // Si le JSON est pourri, on renvoie un tableau vide au lieu de faire crash le serveur
      console.error("Erreur de parsing JSON sur 'texts':", value);
      return [];
    }
  })
  texts: any[];
}