// src/data/content.ts

export const content = {
  home: {
    hero: {
      slides: [
        {
            id: 1,
            image: "/assets/hero_banner_1.webp",
            title: "Diseños\nhechos para\nvos.",
            subtitle:
            "Cada pieza combina materiales, color y personalidad\npara acompañarte todos los días.",
            background: "#dfd5c6",
            textColor: "#290801",
        },
        {
            id: 2,
            image: "/assets/hero_banner_2.webp",
            title: "Cada pieza\ncuenta una\nhistoria.",
            subtitle:
            "No hay dos iguales. Cada pieza se confecciona\nde manera artesanal cuidando cada detalle.",
            background: "#ea4989",
            textColor: "#E9DDD2",
        },
        {
            id: 3,
            image: "/assets/hero_banner_3.webp",
            title: "Creados \na tu\nmanera.",
            subtitle:
            "Elegí colores, telas y detalles para crear un bolso\ncompletamente personalizado.",
            background: "#e39ad9",
            textColor: "#290801",
        }
      ],
    },

    about: {
      title: "Sobre Noventitre",
      description:
        "Cada pieza es creada a mano, priorizando la calidad, los detalles y la identidad.",
    },

    process: {
      title: "Proceso",
      items: [
        {
          title: "Diseño",
          description: "...",
        },
        {
          title: "Selección de materiales",
          description: "...",
        },
      ],
    },

    footer: {
      copyright: "© Noventitre",
      handmade: "Handmade in Barcelona",
    },
  },

  collection: {
    title: "Colección",
    subtitle: "Descubrí todos nuestros productos.",

    filters: {
      all: "Todos",
      bags: "Bolsos",
      wallets: "Billeteras",
    },

    empty: {
      title: "No encontramos productos",
      description: "Probá otro filtro.",
    },
  },

  productDetail: {
    sections: {
      description: "Descripción",
      materials: "Materiales",
      category: "Categoría",
      shipping: "Envíos",
      information: "Información",
      stock: "Disponibilidad",
    },

    buttons: {
      buy: "Comprar ahora",
      whatsapp: "Consultar por WhatsApp",
    },

    shipping:
      "Envíos a toda España. El costo se calcula durante el checkout.",

    handmade:
      "Cada pieza es confeccionada artesanalmente, por lo que pequeñas variaciones forman parte de su identidad.",

    stripe: "Pago seguro mediante Stripe",
  },

  checkout: {
    title: "Checkout",

    orderSummary: {
      title: "Resumen del pedido",
      subtotal: "Subtotal",
      shipping: "Envío",
      total: "Total",
      secure: "Pago seguro mediante Stripe",
    },

    loading: "Preparando la pasarela de pago...",
  },

  cart: {
    title: "Mi carrito",

    buttons: {
      continueShopping: "Seguir comprando",
      checkout: "Finalizar compra",
    },

    empty: {
      title: "Tu carrito está vacío",
      description: "Todavía no agregaste ningún producto.",
    },
  },

  common: {
    back: "Volver",
    loading: "Cargando...",
    outOfStock: "Agotado",
    inStock: "En stock",
  },
};