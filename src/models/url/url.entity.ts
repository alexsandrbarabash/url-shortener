import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  AllowNull,
  AutoIncrement,
} from 'sequelize-typescript';
import { IUrl } from './url.query.models';

@Table({ timestamps: false })
export class Url extends Model implements IUrl {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  // @AllowNull(false)
  @Column(DataType.TEXT)
  url: string;

  // @AllowNull(false)
  @Column(DataType.STRING)
  nanoId: string;
}
