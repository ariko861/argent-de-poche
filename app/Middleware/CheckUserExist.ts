import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class CheckUserExist {
  public async handle({response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const users = await User.all()

    if (users.length > 0) {
      response.unauthorized({ error: 'Un administrateur existe déjà' })
      return
    }

    await next()
  }
}
