import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Compte from "App/Models/Compte";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @hasMany(() => Compte)
  public comptesOwned: HasMany<typeof Compte>

  @hasMany(() => Compte)
  public comptesUsed: HasMany<typeof Compte>



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
