import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
} from "typeorm";
import { Rating } from "./enum/rating.enum";
import { SpecialFeature } from "./enum/special-feature.enum";

@Entity()
export class Film {
  @PrimaryGeneratedColumn({ name: 'film_id' })
  filmId: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  releaseYear?: number;

  @Column()
  languageId: number;

  @Column({ nullable: true })
  originalLanguageId?: number;

  @Column()
  rentalDuration: number;

  @Column()
  rentalRate: number;

  @Column({ nullable: true })
  length?: number;

  @Column()
  replacementCost: number;

  @Column({
    type: "enum",
    enum: Rating
  })
  rating: Rating;

  @Column({
    type: "set",
    enum: SpecialFeature,
    nullable: true,
  })
  specialFeatures?: SpecialFeature[];

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  lastUpdate: Date;
}
