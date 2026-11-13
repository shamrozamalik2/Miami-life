import { useId, useState } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import WhatsAppIcon from '../ui/WhatsAppIcon'
import { whatsappLink } from '../../data/company'

const initial = { name: '', email: '', phone: '', interest: '', message: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.phone.trim() && !values.email.trim()) errors.phone = 'Please provide a phone number or email.'
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Please enter a valid email.'
  if (values.phone && !/^[+\d][\d\s()-]{6,}$/.test(values.phone)) errors.phone = 'Please enter a valid phone number.'
  return errors
}

/**
 * Shared enquiry form (contact page + property details).
 * DEMO: submission is simulated locally. Connect to email / CRM / form service before launch.
 */
export default function InquiryForm({ property, dark = false, compact = false }) {
  const uid = useId()
  const [values, setValues] = useState({
    ...initial,
    message: property ? `I'm interested in "${property.title}" (${property.id}). Please send me more details.` : '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const update = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1100)
  }

  const labelCls = `field-label ${dark ? '!text-white/60' : ''}`
  const fieldCls = `field ${dark ? '!border-white/15 !bg-white/5 !text-white placeholder:!text-white/35' : ''}`
  const waMessage = property
    ? `Hello, I'm interested in ${property.title} in ${property.location} (ref ${property.id}).`
    : 'Hello Ultimate Properties, I would like to enquire about a property.'

  if (status === 'sent') {
    return (
      <div
        role="status"
        className={`flex flex-col items-start gap-5 p-8 ${dark ? 'border border-white/10 text-white' : 'bg-white'}`}
      >
        <CheckCircle2 size={40} strokeWidth={1.2} className="text-gold" />
        <h3 className={`font-display text-3xl ${dark ? 'text-white' : 'text-navy'}`}>
          Thank you, {values.name.split(' ')[0]}.
        </h3>
        <p className={dark ? 'text-white/70' : 'text-muted'}>
          Your enquiry has been received. A member of the team will be in touch shortly.
        </p>
        <p className={`text-[12px] ${dark ? 'text-white/40' : 'text-muted/80'}`}>
          Demo preview: this form is not yet connected, so no message was sent. For an immediate reply, use WhatsApp.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="btn-gold">
            <WhatsAppIcon className="h-4 w-4" /> Continue on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setValues({ ...initial })
              setStatus('idle')
            }}
            className={dark ? 'btn-outline-light' : 'btn-outline-dark'}
          >
            New enquiry
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className={`grid gap-5 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div className={compact ? '' : 'sm:col-span-2'}>
          <label htmlFor={`${uid}-name`} className={labelCls}>
            Full name *
          </label>
          <input
            id={`${uid}-name`}
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
            className={fieldCls}
            placeholder="Your name"
          />
          {errors.name && (
            <p id={`${uid}-name-err`} className="mt-1.5 text-[13px] text-red-500">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className={labelCls}>
            Phone / WhatsApp *
          </label>
          <input
            id={`${uid}-phone`}
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={update('phone')}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
            className={fieldCls}
            placeholder="+971"
          />
          {errors.phone && (
            <p id={`${uid}-phone-err`} className="mt-1.5 text-[13px] text-red-500">
              {errors.phone}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={labelCls}>
            Email
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${uid}-email-err` : undefined}
            className={fieldCls}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id={`${uid}-email-err`} className="mt-1.5 text-[13px] text-red-500">
              {errors.email}
            </p>
          )}
        </div>
        {!property && (
          <div className={compact ? '' : 'sm:col-span-2'}>
            <label htmlFor={`${uid}-interest`} className={labelCls}>
              I am looking to
            </label>
            <select id={`${uid}-interest`} value={values.interest} onChange={update('interest')} className={fieldCls}>
              <option value="">Select an option</option>
              <option>Buy a property</option>
              <option>Rent a property</option>
              <option>Sell my property</option>
              <option>Let my property</option>
              <option>Something else</option>
            </select>
          </div>
        )}
        <div className={compact ? '' : 'sm:col-span-2'}>
          <label htmlFor={`${uid}-message`} className={labelCls}>
            Message
          </label>
          <textarea
            id={`${uid}-message`}
            rows={compact ? 4 : 5}
            value={values.message}
            onChange={update('message')}
            className={`${fieldCls} resize-none`}
            placeholder="Tell us what you are looking for — area, budget, move-in date…"
          />
        </div>
      </div>

      <div className={`flex flex-col gap-3 ${compact ? '' : 'sm:flex-row'}`}>
        <button type="submit" disabled={status === 'sending'} className="btn-gold flex-1">
          {status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
          {status === 'sending' ? 'Sending…' : property ? 'Send Enquiry' : 'Send Message'}
        </button>
        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${dark ? 'btn-outline-light' : 'btn-outline-dark'} flex-1`}
        >
          <WhatsAppIcon className="h-4 w-4" /> WhatsApp
        </a>
      </div>
      <p className={`text-[12px] leading-relaxed ${dark ? 'text-white/40' : 'text-muted/80'}`}>
        By submitting, you agree to be contacted about your enquiry. Your details are never shared.
      </p>
    </form>
  )
}
