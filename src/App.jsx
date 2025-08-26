// App.jsx
import React, { useEffect, useState, Suspense } from 'react'
import Link from "../framework/Link.jsx"
//框架代码

import useLoad from './libs/useLoad.js'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
export default function App() {
  
  const ctx = useLoad()
  const Page = ctx.Page
  if(!ctx.audio.current)return

  return (
    <div className='select-none fixed inset-0 overflow-auto bg-cover bg-[url(/assets/images/cover.jpg)] '>  
     <Header {...{ctx}}/>
     
     <main>        
      <Suspense fallback={<div>Loading...</div>}>
        {Page&&<Page.default {...{ctx}}/>}
      </Suspense>
     </main>
    {ctx.book&&<Footer {...{ctx}}/> }
    </div>
  )
}
