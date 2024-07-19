/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Compte from 'App/Models/Compte'
import User from 'App/Models/User'

// Route.get('/', async ({ view }) => {
//   return view.render('welcome')
// })

Route.get('/', async ({ auth, view }) => {
  
  await auth.use('web').authenticate()
  const user: User = auth.user!
  // let comptes = user?.comptes
  let comptes = await user.related('comptes').query()
  // let comptes = await Compte.all()
  console.log(comptes)

  return view.render('home', {
    comptes: comptes,
  })
})

Route.get('/logout', async({ auth, response }) => {
  await auth.use('web').logout()
  response.redirect('/login')
})

Route.get('/compte', async({response}) => {
  response.redirect().toPath('/')
})

Route.get('/new_compte', async({view, auth}) => {
  await auth.use('web').authenticate()
  return view.render('compte')
})

Route.post('/new_compte', async({request, auth, response}) => {
  await auth.use('web').authenticate()

    let compte = new Compte()
    if (auth.user){
      compte.name = request.input('name')
      compte.total = request.input('total')
      compte.salary = request.input('salary')
      compte.user_id = auth.user?.id
      compte.manager_id = auth.user?.id

      console.log(compte)

      await compte.save()
    }
    response.redirect('/')
})

Route.get('/delete-all-users', async({response}) => {
  await User.query().delete() // cela supprime tous les utilisateurs !!!
  response.redirect('/login')
})


Route.get('/login', async ({view, response}) => {
  const users = await User.all()
  console.log(users)
  // eslint-disable-next-line 
  if (users.length == 0) {
    response.redirect('/register')
  }
  return view.render('login')
})

Route.post('login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  try {
    await auth.use('web').attempt(email, password)
    console.log(auth.user)
    response.redirect('/')
  } catch {
    return response.badRequest('Invalid credentials')
  }
})

Route.group(() => { // on groupe les routes register pour y appliquer middleware

  Route.get('/register', async ({view}) => {
    return view.render('register')
  })

  Route.post('/register', async({request})=> {
    console.log(request.body())
    const user = new User()
    user.email = request.input('email')
    user.name = request.input('name')
    user.password = request.input('password')
    const allUsers = await User.all()
    if (allUsers.length == 0){
      user.type = 'manager';  
    }
    
    await user.save()
  })

})//.middleware('userExists') // On vérifie qu'aucun utilisateur existe pour la registration



Route.get('/compte/:id', async ({ params, view }) => {
  return view.render('compte', {
    id: params.id,
  })
})

Route.get('/temps/:ville', async ({ params, view }) => {

  let climat = {
    'chastres': 'nuageux',
    'bruxelles' : 'ensoleillé',
    'gand' : 'fumée',
  }

  let temps = climat[params.ville]
  if (!temps) {
    temps = 'pluvieux'
  }

  return view.render('climat', {
    ville : params.ville,
    temps : temps,
    color: 'red',
  })
})

