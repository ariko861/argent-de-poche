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
import User from 'App/Models/User'

// Route.get('/', async ({ view }) => {
//   return view.render('welcome')
// })

Route.get('/', async ({ auth, view }) => {
  let ids : number[] = []
  for (let i=1; i<=3; i++){
    ids.push(i)
  }
  await auth.use('web').authenticate()
  return view.render('home', {
    ids: ids,
  })
})

Route.get('/logout', async({ auth, response }) => {
  await auth.use('web').logout()
  response.redirect('/login')
})

Route.get('/compte', async({response}) => {
  response.redirect().toPath('/')
})


Route.get('/login', async({view}) => {
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

Route.get('/register', async({view}) => {
  return view.render('register')
})

Route.post('/register', async({request})=> {
  console.log(request.body())
  const user = new User()
  user.email = request.input('email')
  user.name = request.input('name')
  user.password = request.input('password')

  await user.save()

})



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

