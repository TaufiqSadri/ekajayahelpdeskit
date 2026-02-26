import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

function TicketPage(){

const navigate = useNavigate()

const [tickets,setTickets] = useState([])
const [modalOpen,setModalOpen] = useState(false)

const [formData,setFormData] = useState({
title:'',
description:'',
priority:'medium'
})


useEffect(()=>{

fetchMyTickets()

},[])



const fetchMyTickets = async()=>{

const {data:{session}} =
await supabase.auth.getSession()

if(!session) return


const {data,error} =
await supabase
.from('tickets')
.select('*')
.eq('user_id',session.user.id)
.order('created_at',{ascending:false})

if(error){

console.error(error)
return

}

setTickets(data || [])

}



/* BUAT TIKET */

const handleSubmit = async(e)=>{

e.preventDefault()

const {data:{session}} =
await supabase.auth.getSession()

if(!session) return


const {error} =
await supabase
.from('tickets')
.insert({

title:formData.title,
description:formData.description,
priority:formData.priority,
user_id:session.user.id,
status:'open'

})


if(error){

console.error(error)
return

}


setModalOpen(false)

setFormData({
title:'',
description:'',
priority:'medium'
})

fetchMyTickets()

}



return(

<div className="space-y-6">


<div className="flex justify-between items-center">

<h1 className="text-2xl font-bold">

Tiket Saya

</h1>


<button
onClick={()=>setModalOpen(true)}
className="btn-primary"
>

Buat Tiket

</button>


</div>



<Card>

<div className="space-y-4">

{tickets.length===0?(

<div className="text-gray-500 text-center py-6">

Belum ada tiket

</div>

):(


tickets.map(ticket=>(

<div
key={ticket.id}
onClick={()=>navigate(`/tickets/${ticket.id}`)}
className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
>

<div className="font-semibold">

{ticket.title}

</div>


<div className="text-sm text-gray-500">

Status: {ticket.status}

</div>


<div className="text-xs text-gray-400">

{new Date(ticket.created_at)
.toLocaleDateString('id-ID')}

</div>

</div>

))

)}

</div>

</Card>



{/* MODAL BUAT TIKET */}

<Modal
isOpen={modalOpen}
onClose={()=>setModalOpen(false)}
title="Buat Tiket"
>

<form
onSubmit={handleSubmit}
className="space-y-5"
>

<div>

<label className="block mb-1 font-medium">

Judul Tiket

</label>


<input
type="text"
className="w-full border rounded-lg px-3 py-2"
placeholder="Contoh: Internet tidak bisa diakses"
value={formData.title}
onChange={(e)=>
setFormData({
...formData,
title:e.target.value
})
}
required
/>

</div>



<div>

<label className="block mb-1 font-medium">

Deskripsi Masalah

</label>


<textarea
className="w-full border rounded-lg px-3 py-2 h-28"
placeholder="Jelaskan masalah yang terjadi..."
value={formData.description}
onChange={(e)=>
setFormData({
...formData,
description:e.target.value
})
}
required
/>

</div>



<div>

<label className="block mb-1 font-medium">

Prioritas

</label>


<select
className="w-full border rounded-lg px-3 py-2"
value={formData.priority}
onChange={(e)=>
setFormData({
...formData,
priority:e.target.value
})
}
>

<option value="low">
Low - Tidak Mendesak
</option>

<option value="medium">
Medium - Normal
</option>

<option value="high">
High - Mendesak
</option>

</select>

</div>



<button
type="submit"
className="btn-primary w-full py-3"
>

Submit Tiket

</button>

</form>

</Modal>


</div>

)

}

export default TicketPage