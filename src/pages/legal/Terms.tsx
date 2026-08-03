import React from 'react';
import { motion } from 'framer-motion';

export const TermsPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto px-6 py-25 md:py-20 text-stone-800"
    >
      <header className="mb-10 pb-6 border-b border-stone-200">
        <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-stone-900 mb-2">
          Términos y Condiciones
        </h1>
        <p className="text-sm text-stone-500">Condiciones de uso y contratación en Noventitre</p>
      </header>

      <div className="space-y-8 text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-stone-900">1. Objeto y Ámbito de Aplicación</h2>
          <p className="text-stone-600">
            Las presentes condiciones regulan el uso del sitio web de <strong>Noventitre</strong> y la compra de productos a través del mismo. La navegación o realización de un pedido implica la aceptación expresa de los presentes términos.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-stone-900">2. Información de Productos y Disponibilidad</h2>
          <p className="text-stone-600">
            Dado que nuestros artículos son hechos a mano, las cantidades en stock son limitadas. Hacemos todo lo posible por reflejar fielmente la imagen y descripción de cada producto. Nos reservamos el derecho de retirar o actualizar cualquier artículo en cualquier momento.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-stone-900">3. Precios y Formas de Pago</h2>
          <p className="text-stone-600">
            Todos los precios mostrados en el sitio web están en Euros (€) e incluyen los impuestos indirectos correspondientes. Los gastos de envío se calcularán y detallarán de manera transparente antes de finalizar el checkout.
          </p>
          <p className="text-stone-600">
            Los pagos se procesan a través de pasarelas de pago seguras mediante Stripe con encriptación SSL.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-stone-900">4. Propiedad Intelectual</h2>
          <p className="text-stone-600">
            Todos los contenidos de la plataforma (marcas, logotipos, imágenes, fotografias de producto, textos y código fuente) son propiedad exclusiva de Noventitre o cuentan con las licencias correspondientes, quedando estrictamente prohibida su reproducción o distribución sin autorización previa.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-stone-900">5. Ley Aplicable y Jurisdicción</h2>
          <p className="text-stone-600">
            Las compras realizadas en este sitio web se someten a la legislación española y europea vigente. Ante cualquier desacuerdo, las partes buscarán una solución de buena fe antes de acudir a las instancias judiciales correspondientes.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default TermsPage;