import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import App from './App'
import SmoothScroll from './components/motion/SmoothScroll'
import { IntroProvider } from './components/motion/Intro'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* reducedMotion="user": transform animations are skipped for people who prefer reduced motion */}
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <IntroProvider>
            <App />
          </IntroProvider>
        </SmoothScroll>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
)
