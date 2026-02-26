import { useState, useEffect } from 'react'
import Card from '../components/Card'
import Modal from '../components/Modal'
import { Plus, Megaphone } from 'lucide-react'
import { supabase } from '../lib/supabase'

function Announcements() {

const [announcements,setAnnouncements] = useState([])
const [loading,setLoading] = useState(true)

const [modalOpen,setModalOpen] = useState(false)

const [role,setRole] = useState(null)

const [formData,setFormData] = useState({
title:'',
content:''
})


useEffect(()=>{

loadData()

},[])



/* LOAD DATA */

const loadData = async()=>{


const {data:{session}} =
await supabase.auth.getSession()

if(!session) return


/* AMBIL ROLE */

const {data:profile} =
await supabase
.from('profiles')
.select('role')
.eq('id',session.user.id)
.single()

setRole(profile?.role)



/* AMBIL PENGUMUMAN */

const {data,error} =
await supabase
.from('announcements')
.select('*')
.order('created_at',{ascending:false})


if(error){

console.error(error)
return

}


setAnnouncements(data || [])

setLoading(false)

}



/* CREATE */

const handleCreateAnnouncement = async(e)=>{

e.preventDefault()

const {data:{session}} =
await supabase.auth.getSession()

if(!session) return


await supabase
.from('announcements')
.insert({

title:formData.title,
content:formData.content,
created_by:session.user.id

})


setFormData({

title:'',
content:''

})


setModalOpen(false)

loadData()

}



/* DELETE */

const deleteAnnouncement = async(id)=>{

await supabase
.from('announcements')
.delete()
.eq('id',id)

loadData()

}



return(

<div className="space-y-6">


{/* HEADER */}

<div className="flex items-center justify-between">

<div>

<h1 className="text-2xl font-bold text-gray-800 mb-2">

Pengumuman IT

</h1>

<p className="text-gray-600">

Pengumuman dan informasi penting IT

</p>

</div>



{/* BUTTON ADMIN ONLY */}

{role==='admin' &&(

<button
onClick={()=>setModalOpen(true)}
className="btn-primary flex items-center gap-2"
>

<Plus size={20}/>

Tambah Pengumuman

</button>

)}


</div>



{/* LIST */}

{loading ?(

<Card>

<div className="py-8 text-center text-gray-500">

Memuat pengumuman...

</div>

</Card>

):(announcements.length===0?(

<Card>

<div className="py-8 text-center text-gray-500">

Belum ada pengumuman

</div>

</Card>

):(


<div className="space-y-4">


{announcements.map(a=>(

<Card key={a.id}>


<div className="flex items-start gap-4">


<div className="p-3 bg-emerald-700 rounded-lg">

<Megaphone
className="text-white"
size={24}
/>

</div>



<div className="flex-1">


<h3 className="text-lg font-semibold text-gray-800 mb-2">

{a.title}

</h3>


<p className="text-gray-600 mb-3 whitespace-pre-wrap">

{a.content}

</p>


<div className="flex items-center justify-between text-sm text-gray-500">


<span>

{new Date(a.created_at)
.toLocaleDateString('id-ID',{
day:'2-digit',
month:'long',
year:'numeric'
})}

</span>



{/* DELETE ADMIN */}

{role==='admin' &&(

<button
onClick={()=>deleteAnnouncement(a.id)}
className="text-red-500 text-sm"
>

Hapus

</button>

)}


</div>


</div>


</div>


</Card>

))}


</div>

))}



{/* MODAL ADMIN */}

<Modal

isOpen={modalOpen}

onClose={()=>setModalOpen(false)}

title="Tambah Pengumuman"

>


<form
onSubmit={handleCreateAnnouncement}
className="space-y-4"
>


<input

type="text"

placeholder="Judul pengumuman"

value={formData.title}

onChange={(e)=>

setFormData({
...formData,
title:e.target.value
})

}

className="input-field"

required

/>


<textarea

placeholder="Isi pengumuman"

value={formData.content}

onChange={(e)=>

setFormData({
...formData,
content:e.target.value
})

}

className="input-field"

rows={5}

required

/>


<div className="flex gap-3 justify-end">


<button
type="button"
onClick={()=>setModalOpen(false)}
className="btn-secondary"
>

Batal

</button>


<button
type="submit"
className="btn-primary"
>

Publikasikan

</button>


</div>


</form>


</Modal>


</div>

)

}

export default Announcements