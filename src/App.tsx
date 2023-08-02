import React from 'react'
import './App.sass'
import { IntroPage } from './pages/intro/IntroPage'
import { ExplainPage } from './pages/explain/ExplainPage'
import { SubscribePage } from './pages/subscribe/SubscribePage'
import { Footer } from './pages/footer/Footer'

function App(): React.ReactNode {
  return (
    <div id="page">
      {/* pages will go here */}
      <IntroPage></IntroPage>
      <ExplainPage></ExplainPage>
      <SubscribePage></SubscribePage>
      <Footer></Footer>
    </div>
  )
}

export default App