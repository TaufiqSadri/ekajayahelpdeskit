import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

function TicketDetail(){

const { id } = useParams()

const [ticket,setTicket] = useState(null)
const [role,setRole] = useState(null)

const [discussions,setDiscussions] = useState([])
const [message,setMessage] = useState('')

const [loading,setLoading] = useState(true)



useEffect(()=>{

loadData()

},[id])



const loadData = async()=>{

const {data:{session}} =
await supabase.auth.getSession()

if(!session) return


/* ambil role */

const {data:profile} =
await supabase
.from('profiles')
.select('role')
.eq('id',session.user.id)
.single()

setRole(profile?.role)



/* ambil tiket */

const {data:ticketData} =
await supabase
.from('tickets')
.select(`
 *,
 profiles(full_name)
`)
.eq('id',id)
.single()

setTicket(ticketData)



/* ambil diskusi */

const {data:discussionData} =
await supabase
.from('internal_discussions')
.select(`
 id,
 message,
 created_at,
 profiles(full_name)
`)
.eq('ticket_id',id)
.order('created_at',{ascending:true})

setDiscussions(discussionData || [])


setLoading(false)

}



/* CLOSE TICKET */

const closeTicket = async()=>{

await supabase
.from('tickets')
.update({
status:'closed'
})
.eq('id',id)

loadData()

}



/* TAMBAH DISKUSI */

const sendDiscussion = async(e)=>{

e.preventDefault()

if(!message.trim()) return


const {data:{session}} =
await supabase.auth.getSession()


await supabase
.from('internal_discussions')
.insert({

ticket_id:id,

user_id:session.user.id,

message:message

})


setMessage('')

loadData()

}



/* HAPUS DISKUSI */

const deleteDiscussion = async (discussionId) => {

  const { error } =
  await supabase
  .from('internal_discussions')
  .delete()
  .eq('id', discussionId)
  
  if(error){
  console.error(error)
  return
  }
  
  setTimeout(()=>{
  loadData()
  },300)
  
  }



if(loading)
return <div>Loading...</div>


if(!ticket)
return <div>Tiket tidak ditemukan</div>



return(

<div className="space-y-6">


{/* DETAIL TIKET */}

<Card>

<h2 className="text-xl font-bold mb-4">

{ticket.title}

</h2>


<p className="mb-2">

Pelapor:

{ticket.profiles?.full_name}

</p>


<p className="mb-2">

Status:

<span className="ml-2 font-semibold">

{ticket.status}

</span>

</p>


<p className="mb-2">

Prioritas:

{ticket.priority}

</p>



<div className="mt-4 p-4 bg-gray-50 rounded">

{ticket.description}

</div>



{/* BUTTON CLOSE TIKET */}

{role === 'admin' && ticket.status === 'open' &&(

<button
onClick={closeTicket}
className="btn-primary mt-4"
>

Close Ticket

</button>

)}

</Card>



{/* DISKUSI INTERNAL ADMIN */}

{role === 'admin' &&(

<Card>

<h3 className="text-lg font-semibold mb-4">

Diskusi Internal

</h3>



{/* LIST DISKUSI */}

<div className="space-y-3 mb-4">

{discussions.length === 0 ?(

<div className="text-gray-500">

Belum ada diskusi

</div>

):(


discussions.map(d=>(

<div
key={d.id}
className="p-3 border rounded"
>

<div className="flex justify-between">

<div className="text-sm font-semibold">

{d.profiles?.full_name}

</div>


<button
onClick={()=>deleteDiscussion(d.id)}
className="text-red-500 text-sm"
>

Hapus

</button>

</div>


<div className="text-sm mt-1">

{d.message}

</div>


<div className="text-xs text-gray-500 mt-1">

{new Date(d.created_at)
.toLocaleString('id-ID')}

</div>

</div>

))

)}

</div>



{/* FORM DISKUSI */}

<form onSubmit={sendDiscussion}>

<textarea
value={message}
onChange={(e)=>setMessage(e.target.value)}
placeholder="Tulis diskusi perbaikan..."
className="w-full border rounded p-2 mb-3"
required
/>


<button
type="submit"
className="btn-primary"
>

Kirim Diskusi

</button>

</form>

</Card>

)}



</div>

)

}

export default TicketDetail