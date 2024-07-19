import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Compte extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public total: number

  @column()
  public salary: number

  @column()
  public user_id: number

  @column()
  public manager_id: number

  @belongsTo(() => User, {
    localKey: 'manager_id'
  })
  public manager: BelongsTo<typeof User>

  @belongsTo(() => User, {
    localKey: 'user_id'
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
