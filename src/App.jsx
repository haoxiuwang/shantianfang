// App.jsx
import React, { useEffect, useState, Suspense } from 'react'

//框架代码
import { useRoute } from '../framework/useRoute.js'
import usePage from '../framework/usePage.js'
import useLoad from '../framework/useLoad.js'

export default function App() {
  const path = useRoute()
  const Page = usePage(path)
  const ctx = useLoad()
 
  return (
    <div>      
      <Suspense fallback={<div>Loading...</div>}>
       {Page&&<Page.default {...{ctx}}/>}
      </Suspense>
    </div>
  )
}
