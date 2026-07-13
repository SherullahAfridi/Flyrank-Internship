import { useEffect, useState } from 'react'
import './App.css'

const skillOptions = [
  'React',
  'JavaScript',
  'CSS',
  'UI Design',
  'Accessibility',
  'Node.js',
  'Figma',
  'Animation',
  'Performance',
  'API Design',
]

const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Argentina',
  'Australia',
  'Austria',
  'Bangladesh',
  'Belgium',
  'Brazil',
  'Canada',
  'Chile',
  'China',
  'Colombia',
  'Czech Republic',
  'Denmark',
  'Egypt',
  'Finland',
  'France',
  'Germany',
  'Ghana',
  'Greece',
  'India',
  'Indonesia',
  'Ireland',
  'Israel',
  'Italy',
  'Japan',
  'Kenya',
  'Malaysia',
  'Mexico',
  'Morocco',
  'Netherlands',
  'New Zealand',
  'Nigeria',
  'Norway',
  'Pakistan',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Romania',
  'Russia',
  'Saudi Arabia',
  'Singapore',
  'South Africa',
  'South Korea',
  'Spain',
  'Sri Lanka',
  'Sweden',
  'Switzerland',
  'Thailand',
  'Turkey',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Vietnam',
]

const genderOptions = ['Female', 'Male', 'Non-binary', 'Prefer not to say']
const maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Widowed']
const educationOptions = ['High School', 'Bachelor', 'Master', 'Doctorate']

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  dob: '',
  gender: '',
  country: '',
  maritalStatus: '',
  education: '',
  fieldStudy: '',
  skills: [],
}

function App() {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [visibleGroups, setVisibleGroups] = useState({})
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const items = document.querySelectorAll('.field-group')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index
            setVisibleGroups((prev) => ({ ...prev, [index]: true }))
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!successMessage) return undefined

    const timer = window.setTimeout(() => {
      setSuccessMessage('')
    }, 4000)

    return () => window.clearTimeout(timer)
  }, [successMessage])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleDropdownChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSkillToggle = (skill) => {
    setFormData((prev) => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter((item) => item !== skill)
        : [...prev.skills, skill]

      return { ...prev, skills }
    })
    setErrors((prev) => ({ ...prev, skills: '' }))
  }

  const validateForm = () => {
    const nextErrors = {}

    const requiredFields = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'dob', label: 'Date of Birth' },
      { key: 'gender', label: 'Gender' },
      { key: 'country', label: 'Country' },
      { key: 'maritalStatus', label: 'Marital Status' },
      { key: 'education', label: 'Education Level' },
      { key: 'fieldStudy', label: 'Field of Study' },
    ]

    requiredFields.forEach(({ key, label }) => {
      const value = formData[key]
      if (typeof value === 'string' && value.trim() === '') {
        nextErrors[key] = `${label} is required.`
      }
    })

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    const digits = formData.phone.replace(/\D/g, '')
    if (digits.length < 10) {
      nextErrors.phone = 'Phone number must contain at least 10 digits.'
    }

    if (formData.skills.length === 0) {
      nextErrors.skills = 'Please select at least one skill.'
    }

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateForm()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSuccessMessage('')
      return
    }

    setErrors({})
    setIsSubmitting(true)
    setSuccessMessage('')

    window.setTimeout(() => {
      setIsSubmitting(false)
      setSuccessMessage('✅ Profile submitted successfully!')
      setFormData(initialFormData)
    }, 2000)
  }

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12
    setPointer({ x, y })
  }

  const cardStyle = {
    '--pointer-x': `${pointer.x}px`,
    '--pointer-y': `${pointer.y}px`,
  }

  return (
    <div className="page-shell">
      <div className="background-layer" aria-hidden="true">
        <div className="blob blob-one" />
        <div className="blob blob-two" />
        <div className="blob blob-three" />
      </div>

      <div
        className="contact-card"
        onMouseMove={handlePointerMove}
        onMouseLeave={() => setPointer({ x: 0, y: 0 })}
        style={cardStyle}
      >
        <div className="card-header">
          <p className="eyebrow">Creator profile</p>
          <h1>Contact &amp; Bio Form</h1>
          <p className="intro">
            Share your story with a polished profile that feels modern,
            personal, and easy to complete.
          </p>
        </div>

        {successMessage ? (
          <div className="status-banner success" role="status">
            {successMessage}
          </div>
        ) : null}

        <form className="contact-form" onSubmit={handleSubmit}>
          <p className="section-label">Personal details</p>

          <div className={`field-group ${visibleGroups[0] ? 'is-visible' : ''} ${errors.name ? 'has-error' : ''}`} data-index="0">
            <label className="field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ava Johnson"
              />
            </label>
            {errors.name ? <div className="field-error">{errors.name}</div> : null}
          </div>

          <div className={`field-group ${visibleGroups[1] ? 'is-visible' : ''} ${errors.email ? 'has-error' : ''}`} data-index="1">
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ava@email.com"
              />
            </label>
            {errors.email ? <div className="field-error">{errors.email}</div> : null}
          </div>

          <div className={`field-group ${visibleGroups[2] ? 'is-visible' : ''} ${errors.phone ? 'has-error' : ''}`} data-index="2">
            <label className="field">
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 555 123 4567"
              />
            </label>
            {errors.phone ? <div className="field-error">{errors.phone}</div> : null}
          </div>

          <div className={`field-group ${visibleGroups[3] ? 'is-visible' : ''} ${errors.dob ? 'has-error' : ''}`} data-index="3">
            <label className="field">
              <span>Date of Birth</span>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </label>
            {errors.dob ? <div className="field-error">{errors.dob}</div> : null}
          </div>

          <div className={`field-group ${visibleGroups[4] ? 'is-visible' : ''} ${errors.gender || errors.maritalStatus ? 'has-error' : ''}`} data-index="4">
            <div className="field-row">
              <label className="field half-width">
                <span>Gender</span>
                <select name="gender" value={formData.gender} onChange={handleDropdownChange}>
                  <option value="">Select</option>
                  {genderOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.gender ? <div className="field-error">{errors.gender}</div> : null}
              </label>

              <label className="field half-width">
                <span>Marital Status</span>
                <select name="maritalStatus" value={formData.maritalStatus} onChange={handleDropdownChange}>
                  <option value="">Select</option>
                  {maritalStatusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.maritalStatus ? <div className="field-error">{errors.maritalStatus}</div> : null}
              </label>
            </div>
          </div>

          <div className={`field-group ${visibleGroups[5] ? 'is-visible' : ''} ${errors.country ? 'has-error' : ''}`} data-index="5">
            <label className="field">
              <span>Country</span>
              <select name="country" value={formData.country} onChange={handleDropdownChange}>
                <option value="">Choose a country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>
            {errors.country ? <div className="field-error">{errors.country}</div> : null}
          </div>

          <p className="section-label">Education & skills</p>

          <div className={`field-group ${visibleGroups[6] ? 'is-visible' : ''} ${errors.education || errors.fieldStudy ? 'has-error' : ''}`} data-index="6">
            <div className="field-row">
              <label className="field half-width">
                <span>Education Level</span>
                <select name="education" value={formData.education} onChange={handleDropdownChange}>
                  <option value="">Select</option>
                  {educationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.education ? <div className="field-error">{errors.education}</div> : null}
              </label>

              <label className="field half-width">
                <span>Field of Study</span>
                <input
                  type="text"
                  name="fieldStudy"
                  value={formData.fieldStudy}
                  onChange={handleChange}
                  placeholder="Computer Science"
                />
                {errors.fieldStudy ? <div className="field-error">{errors.fieldStudy}</div> : null}
              </label>
            </div>
          </div>

          <div className={`field-group ${visibleGroups[7] ? 'is-visible' : ''} ${errors.skills ? 'has-error' : ''}`} data-index="7">
            <label className="field">
              <span>Skills</span>
              <div className="chip-list">
                {skillOptions.map((skill) => {
                  const active = formData.skills.includes(skill)
                  return (
                    <button
                      key={skill}
                      type="button"
                      className={`chip ${active ? 'chip-active' : ''}`}
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {skill}
                    </button>
                  )
                })}
              </div>
            </label>
            {errors.skills ? <div className="field-error">{errors.skills}</div> : null}
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="spinner-row">
                <span className="spinner" />
                Sending...
              </span>
            ) : (
              'Submit Profile'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
