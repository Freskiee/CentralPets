import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { Button } from '../components/UI/Button'
import { Input } from '../components/UI/Input'
import { Card } from '../components/UI/Card'

interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>()

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In real app, this would send to backend
      console.log('Contact form submitted:', data)
      
      setSubmitStatus('success')
      reset()
    } catch (error) {
      console.error('Error submitting contact form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Contáctanos
        </h1>
        <p className="text-xl text-gray-600">
          Estamos aquí para ayudarte. ¡No dudes en escribirnos!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">info@centralpets.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-teal-100 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-teal-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <p className="font-medium">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Dirección</p>
                  <p className="font-medium">123 Pet Street, City, State 12345</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Horarios de Atención</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Lunes - Viernes</span>
                <span className="font-medium">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Sábado</span>
                <span className="font-medium">9:00 AM - 4:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Domingo</span>
                <span className="font-medium">10:00 AM - 2:00 PM</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Soporte Rápido</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-gray-600">Respuesta en menos de 24 horas</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-teal-500" />
                <span className="text-sm text-gray-600">Soporte telefónico disponible</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">Atención especializada por email</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Envíanos un Mensaje</h3>
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600">¡Gracias por tu mensaje! Te responderemos pronto.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">Hubo un error al enviar tu mensaje. Inténtalo de nuevo.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Nombre Completo"
                  type="text"
                  error={errors.name?.message}
                  {...register('name', {
                    required: 'El nombre es requerido',
                    minLength: {
                      value: 2,
                      message: 'El nombre debe tener al menos 2 caracteres'
                    }
                  })}
                />
                
                <Input
                  label="Email"
                  type="email"
                  error={errors.email?.message}
                  {...register('email', {
                    required: 'El email es requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido'
                    }
                  })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Teléfono"
                  type="tel"
                  error={errors.phone?.message}
                  {...register('phone', {
                    required: 'El teléfono es requerido'
                  })}
                />
                
                <Input
                  label="Asunto"
                  type="text"
                  error={errors.subject?.message}
                  {...register('subject', {
                    required: 'El asunto es requerido'
                  })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  rows={6}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Escribe tu mensaje aquí..."
                  {...register('message', {
                    required: 'El mensaje es requerido',
                    minLength: {
                      value: 10,
                      message: 'El mensaje debe tener al menos 10 caracteres'
                    }
                  })}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full flex items-center justify-center space-x-2"
                isLoading={isSubmitting}
              >
                <Send className="h-4 w-4" />
                <span>Enviar Mensaje</span>
              </Button>
            </form>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Preguntas Frecuentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: "¿Cuánto tiempo tarda el envío?",
              answer: "Los envíos normalmente tardan de 2-3 días hábiles. Ofrecemos envío gratis en compras mayores a $50."
            },
            {
              question: "¿Puedo devolver un producto?",
              answer: "Sí, aceptamos devoluciones dentro de 30 días de la compra, siempre que el producto esté en condiciones originales."
            },
            {
              question: "¿Tienen garantía los productos?",
              answer: "Todos nuestros productos tienen garantía del fabricante. Los detalles específicos varían según el producto."
            },
            {
              question: "¿Ofrecen asesoramiento veterinario?",
              answer: "Nuestro equipo incluye especialistas en nutrición animal que pueden ayudarte a elegir los mejores productos."
            }
          ].map((faq, index) => (
            <Card key={index}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}