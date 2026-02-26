import {
  createBrowserRouter,
  Navigate,
  useNavigate
} from "react-router-dom";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import Archives from './pages/Archives.jsx'
import Login from "./pages/login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Tickets from "./pages/Ticket.jsx";
import TicketPage from "./pages/TicketPage.jsx";
import TicketDetail from "./pages/TicketDetail.jsx";
import Announcements from "./pages/Announcements.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";

import AppLayout from "./components/AppLayout.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Restricted from "./pages/Restricted.jsx";


/* ======================
LOGIN CHECK
====================== */

const ProtectedRoute = ({ children }) => {

  const [loading,setLoading] = useState(true)
  const [session,setSession] = useState(null)

  useEffect(()=>{

    supabase.auth.getSession()
    .then(({data})=>{
      setSession(data.session)
      setLoading(false)
    })

  },[])


  if(loading)
    return <div className="p-4">Loading...</div>

  if(!session)
    return <Navigate to="/login"/>

  return children

}



/* ======================
PUBLIC ROUTE
====================== */

const PublicRoute = ({ children }) => {

  const [loading,setLoading] = useState(true)
  const [session,setSession] = useState(null)

  useEffect(()=>{

    supabase.auth.getSession()
    .then(({data})=>{
      setSession(data.session)
      setLoading(false)
    })

  },[])


  if(loading)
    return <div className="p-4">Loading...</div>

  if(session)
    return <Navigate to="/dashboard"/>

  return children

}



/* ======================
ADMIN ROUTE
====================== */

const AdminRoute = ({ children }) => {

  const [loading,setLoading] = useState(true)
  const [isAdmin,setIsAdmin] = useState(false)

  useEffect(()=>{

    const checkAdmin = async()=>{

      const {data:{session}} =
      await supabase.auth.getSession()

      if(!session){
        setLoading(false)
        return
      }

      const {data} =
      await supabase
      .from('profiles')
      .select('role')
      .eq('id',session.user.id)
      .single()

      if(data?.role === 'admin')
        setIsAdmin(true)

      setLoading(false)

    }

    checkAdmin()

  },[])


  if(loading)
    return <div className="p-4">Loading...</div>

  if(!isAdmin)
    return <Navigate to="/restricted"/>

  return children

}



/* ======================
AUTO REDIRECT TICKETS
====================== */

const TicketRedirect = ()=>{

const [loading,setLoading] = useState(true)
const [role,setRole] = useState(null)

useEffect(()=>{

const checkRole = async()=>{

const {data:{session}} =
await supabase.auth.getSession()

if(!session){
setLoading(false)
return
}

const {data} =
await supabase
.from('profiles')
.select('role')
.eq('id',session.user.id)
.single()

setRole(data?.role)
setLoading(false)

}

checkRole()

},[])



if(loading)
return <div className="p-4">Loading...</div>


if(role === 'admin')
return <Navigate to="/tickets-admin"/>


return <Navigate to="/my-tickets"/>

}



/* ======================
NOT FOUND
====================== */

const NotFound = ()=>{

const navigate = useNavigate()

useEffect(()=>{

const timer = setTimeout(()=>{
navigate("/")
},2000)

return ()=>clearTimeout(timer)

},[navigate])


return(

<div className="min-h-screen flex items-center justify-center">

<div className="text-center">

<h1 className="text-4xl font-bold">

404

</h1>

<p className="text-gray-600">

Halaman tidak ditemukan

</p>

</div>

</div>

)

}



/* ======================
ROUTER
====================== */

export const router = createBrowserRouter([


/* AUTH */

{
path:"/login",
element:(
<PublicRoute>
<Login/>
</PublicRoute>
),
errorElement:<ErrorBoundary/>
},

{
path:"/register",
element:(
<PublicRoute>
<Register/>
</PublicRoute>
),
errorElement:<ErrorBoundary/>
},

{
path:"/restricted",
element:<Restricted/>
},



/* MAIN */

{
path:"/",
element:(
<ProtectedRoute>
<AppLayout/>
</ProtectedRoute>
),

children:[

{
index:true,
element:<Navigate to="/dashboard"/>
},

{
path:"dashboard",
element:<Dashboard/>
},

/* AUTO */

{
path:"tickets",
element:<TicketRedirect/>
},

/* USER */

{
path:"my-tickets",
element:<TicketPage/>
},

/* ADMIN */

{
path:"tickets-admin",
element:(
<AdminRoute>
<Tickets/>
</AdminRoute>
)
},
{
  path:'archives',
  element:(
  <AdminRoute>
  <Archives/>
  </AdminRoute>
  )
  },

/* DETAIL */

{
path:"tickets/:id",
element:<TicketDetail/>
},

{
path:"announcements",
element:<Announcements/>
},

{
path:"reports",
element:(
<AdminRoute>
<Reports/>
</AdminRoute>
)
},

{
path:"settings",
element:(
<AdminRoute>
<Settings/>
</AdminRoute>
)
},

]

},


{
path:"*",
element:<NotFound/>
}

])