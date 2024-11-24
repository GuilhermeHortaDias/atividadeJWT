
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Register } from '../pages/Register/Register'
import { Login } from '../pages/Login/Login'
import { Home } from '../pages/Home/Home'
import { UserInfo } from '../pages/Userinfo'
import { PrivateRoute } from './PrivateRouter'
import { Admin } from '../pages/admin'
import CreateProduct from '../pages/admin/create'
import EditProduct from '../pages/admin/edit'



export const AppRouter = () => {
    return (
        <Router>
            <Routes>


                <Route path='/Register' exact element={<Register />} />
                <Route path='/Login' exact element={<Login />} />
                <Route path='/' exact element={<Home />} />
                <Route path='/admin' exact element={<Admin />} />

                <Route element={<PrivateRoute roles={['user', 'admin']} />}>

                    <Route path='/profile' exact element={<UserInfo />} />
                </Route>
                <Route element={<PrivateRoute roles={[, 'admin']} />}>
                    <Route path='/create-product' exact element={<CreateProduct />} />
                    <Route path='/edit-product/:id' exact element={<EditProduct />} />
                
                </Route>


            </Routes>
        </Router>
    )
}