import React from 'react';
import { motion } from 'framer-motion';

export const PrivacyPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto px-6 py-25 text-stone-800"
    >
      <header className="mb-10 pb-6 border-b border-stone-200">
        <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-stone-900 mb-2">
          Política de Privacidad
        </h1>
        <p className="text-sm text-stone-500">Conforme al RGPD (Reglamento General de Protección de Datos)</p>
      </header>

      <div className="space-y-8 text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-stone-900">1. Responsable del Tratamiento de Datos</h2>
          <p className="text-stone-600">
            El responsable del tratamiento de los datos recabados en este sitio web es <strong>Noventitre</strong>. 
            Para cualquier consulta sobre la privacidad de tus datos, puedes contactarnos en <a href="mailto:hola@noventitre.com" className="underline font-medium hover:text-stone-900">hola@noventitre.com</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-stone-900">2. Datos que Recopilamos</h2>
          <p className="text-stone-600">
            Recopilamos la información estrictamente necesaria para procesar tus pedidos de forma correcta:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-stone-600">
            <li>Datos de contacto y entrega: Nombre, apellidos, dirección postal, correo electrónico y teléfono.</li>
            <li>Información de pago: No almacenamos datos de tarjetas de crédito. Toda la pasarela de pago es gestionada de forma encriptada y segura por <strong>Stripe Inc.</strong></li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-stone-900">3. Finalidad del Tratamiento</h2>
          <ul className="list-disc pl-5 space-y-1 text-stone-600">
            <li>Gestionar, procesar y enviar las compras realizadas en la plataforma.</li>
            <li>Enviar notificaciones relativas al estado de tu pedido (confirmación, envío, facturación).</li>
            <li>Atender solicitudes de soporte, dudas o tramitación de devoluciones.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-stone-900">4. Destinatarios de los Datos</h2>
          <p className="text-stone-600">
            Tus datos únicamente se compartirán con proveedores esenciales para llevar a cabo nuestro servicio:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-stone-600">
            <li>Empresas de mensajería y logística para la entrega de paquetes.</li>
            <li>Pasarela de pago Stripe para el procesado seguro de las transacciones.</li>
            <li>Servicios en la nube de infraestructura de la aplicación (Supabase / Vercel).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-stone-900">5. Tus Derechos</h2>
          <p className="text-stone-600">
            Tienes derecho a acceder, rectificar, limitar o solicitar la supresión de tus datos personales en cualquier momento escribiéndonos a nuestro correo de contacto.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default PrivacyPage;