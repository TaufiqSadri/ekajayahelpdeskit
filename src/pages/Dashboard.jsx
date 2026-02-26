import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Dashboard() {

  const navigate = useNavigate()

  const [fullName,setFullName] = useState('User')
  const [role,setRole] = useState(null)

  const [stats,setStats] = useState({
    total:0,
    open:0,
    closed:0
  })


  useEffect(()=>{

    fetchProfile()

  },[])



  /* AMBIL PROFILE */

  const fetchProfile = async()=>{

    const {data:{user}} =
    await supabase.auth.getUser()

    if(!user){
      navigate('/login')
      return
    }


    const {data:profile,error} =
    await supabase
    .from('profiles')
    .select('full_name,role')
    .eq('id',user.id)
    .single()


    if(error){
      console.error(error)
      return
    }


    setFullName(profile.full_name)
    setRole(profile.role)


    fetchStats(user.id,profile.role)

  }



  /* HITUNG TIKET */

  const fetchStats = async(userId,userRole)=>{

    let query =
    supabase
    .from('tickets')
    .select('status')


    if(userRole !== 'admin'){

      query =
      query.eq('user_id',userId)

    }


    const {data,error} =
    await query


    if(error){
      console.error(error)
      return
    }


    const total =
    data.length


    const open =
    data.filter(t=>t.status==='open').length


    const closed =
    data.filter(t=>t.status==='closed').length


    setStats({

      total,
      open,
      closed

    })

  }



  /* STAT CARD */

  const statCards=[

    {
      title:
      role==='admin'
      ? 'Total Semua Tiket'
      : 'Total Tiket Saya',

      value:stats.total,

      accent:'from-emerald-500 to-emerald-700'
    },

    {
      title:'Tiket Diproses',

      value:stats.open,

      accent:'from-amber-400 to-amber-600'
    },

    {
      title:'Tiket Selesai',

      value:stats.closed,

      accent:'from-emerald-300 to-emerald-500'
    }

  ]



  return (

    <div className="space-y-8">


      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="flex items-center gap-3">

          <img
          src="/logo.png"
          alt="Ekajaya Group"
          className="h-10 w-auto object-contain"
          />

          <div>

            <p className="text-xs font-semibold tracking-[0.25em] text-emerald-700 uppercase">
            Ekajaya Group
            </p>

            <h1 className="text-lg md:text-xl font-semibold text-gray-900">
            Ekajaya Group Helpdesk IT
            </h1>

          </div>

        </div>


        <div className="text-right">

          <p className="text-xs text-gray-500">
          Halo,
          </p>

          <p className="text-base font-semibold text-emerald-900">
          {fullName}
          </p>

        </div>

      </div>



      {/* HERO */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 px-6 py-8 md:px-10 md:py-10 text-emerald-50">


        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_#ffffff_0,_transparent_50%),radial-gradient(circle_at_bottom,_#ffffff_0,_transparent_55%)]" />



        {/* HERO TEXT */}

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-8 items-center">


          <div>

            <p className="inline-flex items-center gap-2 text-xs font-medium bg-emerald-950/60 border border-emerald-500/40 rounded-full px-3 py-1 mb-4">

              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>

              Monitoring tiket gangguan IT

            </p>



            <h2 className="text-2xl md:text-3xl font-semibold leading-snug mb-3">

              Pusat kendali

              <span className="block text-emerald-200">
              Helpdesk IT Ekajaya Group
              </span>

            </h2>



            <p className="text-sm text-emerald-100/80 max-w-xl mb-5">

            Pantau status tiket pengaduan Anda dan koordinasikan penyelesaian gangguan operasional.

            </p>



            <button

            type="button"

            onClick={()=>navigate(

            role==='admin'
            ? '/tickets-admin'
            : '/tickets'

            )}

            className="inline-flex items-center justify-center rounded-xl bg-white/95 px-4 py-2.5 text-sm font-semibold text-emerald-900 shadow-md hover:bg-white transition"

            >

            {role==='admin'
            ? 'Kelola Semua Tiket'
            : 'Lihat Tiket Saya'}

            </button>


          </div>



          {/* STATISTIK */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">


            {statCards.map(card=>(

              <div
              key={card.title}
              className="relative rounded-2xl bg-white/95 shadow-sm border border-emerald-50 px-4 py-4 flex flex-col justify-between overflow-hidden"
              >


                <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-700/40"/>

                <div className="absolute right-3 bottom-3 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 opacity-80"/>



                <div className="space-y-1">

                  <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                  {card.title}
                  </p>

                  <p className="text-2xl font-semibold text-gray-900">
                  {card.value}
                  </p>

                </div>


                <div className="mt-4 h-1.5 w-full rounded-full bg-emerald-50 overflow-hidden">

                  <div className={`h-full w-2/3 rounded-full bg-gradient-to-r ${card.accent}`}/>

                </div>


              </div>

            ))}


          </div>


        </div>


      </section>


    </div>

  )

}

export default Dashboard