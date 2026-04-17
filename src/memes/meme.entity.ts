import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Meme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  image: string; // Ici, on stocke juste "meme-1713254000.png"

  @Column({ type: 'jsonb', default: [] })
  // On stocke un tableau d'objets pour les textes (x, y, contenu, couleur)
  texts: any[]; 

  @CreateDateColumn()
  createdAt: Date;
}