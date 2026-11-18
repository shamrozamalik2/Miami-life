import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'

// Inner pages are code-split so the homepage loads only what it needs
const PropertiesPage = lazy(() => import('./pages/PropertiesPage'))
const PropertyDetailsPage = lazy(() => import('./pages/PropertyDetailsPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const page = (el) => <Suspense fallback={<div className="min-h-screen bg-navy" />}>{el}</Suspense>

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="properties" element={page(<PropertiesPage />)} />
        <Route path="properties/:slug" element={page(<PropertyDetailsPage />)} />
        <Route path="about" element={page(<AboutPage />)} />
        <Route path="contact" element={page(<ContactPage />)} />
        <Route path="*" element={page(<NotFoundPage />)} />
      </Route>
    </Routes>
  )
}
