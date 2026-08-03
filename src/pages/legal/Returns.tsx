import React from 'react';
import { motion } from 'framer-motion';

export const ReturnsScreen: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto px-6 py-25 md:py-20 text-stone-800"
    >
      <header className="mb-10 pb-6 border-b border-stone-200">
        <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-stone-900 mb-2">
          Política de Devoluciones y Cambios
        </h1>
        <p className="text-sm text-stone-500">Última actualización: Agosto 2026</p>
      </header>

      <div className="space-y-8 text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-stone-900">1. Garantía Artesanal y Calidad</h2>
          <p className="text-stone-600">
            En <strong>Noventitre</strong>, cada pieza es confeccionada a mano con especial dedicación y atención al detalle. 
            Debido a la naturaleza artesanal de nuestras creaciones, pueden existir pequeñas variaciones en las texturas o tonalidades respecto a las fotos, lo cual otorga un carácter único a cada producto.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-stone-900">2. Derecho de Desistimiento</h2>
          <p className="text-stone-600">
            Conforme a la legislación vigente de la Unión Europea, dispones de un plazo de <strong>14 días naturales</strong> desde la recepción del producto para devolverlo sin necesidad de justificación.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-stone-900">3. Requisitos para la Devolución</h2>
          <ul className="list-disc pl-5 space-y-2 text-stone-600">
            <li>El artículo debe encontrarse sin uso, en perfectas condiciones y con sus etiquetas originales.</li>
            <li>Debe incluir su embalaje o funda original protectora.</li>
            <li>No se admiten devoluciones de piezas confeccionadas bajo pedido especial o personalizaciones explícitas.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-stone-900">4. Proceso de Devolución</h2>
          <ol className="list-decimal pl-5 space-y-2 text-stone-600">
            <li>Envía un correo a <a href="mailto:hola@noventitre.com" className="underline font-medium hover:text-stone-900">hola@noventitre.com</a> indicando tu número de pedido y los artículos a devolver.</li>
            <li>Te responderemos con las instrucciones y la dirección a la cual remitir el paquete.</li>
            <li>Salvo error en el envío o tara de fabricación, los costes de transporte derivados de la devolución corren a cargo del comprador.</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-stone-900">5. Reembolsos</h2>
          <p className="text-stone-600">
            Una vez recibido el paquete en nuestro taller e inspeccionado el producto, procederemos a realizar el reembolso integro del importe mediante el mismo método de pago utilizado en la compra (Stripe / Tarjeta). El reembolso suele verse reflejado en tu cuenta en un plazo de 5 a 10 días laborables.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default ReturnsScreen;