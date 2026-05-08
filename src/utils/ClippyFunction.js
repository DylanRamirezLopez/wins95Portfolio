import clippy1 from '../assets/clippyani1.gif';
import clippy2 from '../assets/clippyani2.gif';
import clippy3 from '../assets/clippyani3.gif';
import clippy4 from '../assets/clippyani4.gif';
import clippy5 from '../assets/clippyani5.gif';
import clippy6 from '../assets/clippyani6.gif';
import clippy7 from '../assets/clippyani7.gif';
import clippyNo from '../assets/clippyNo.gif';

const anims = [clippy1, clippy2, clippy3, clippy4, clippy5, clippy6, clippy7];

function rndAnim() {
  return anims[Math.floor(Math.random() * anims.length)];
}

export const clippySpanish = {
  greeting: [
    { phrase: "¡Hola! No me ignores.", animation: clippy1 },
    { phrase: "¡Ey! Ya llegué. ¿Qué hay?", animation: clippy2 },
    { phrase: "Aquí estoy, tu asistente favorito.", animation: clippy3 },
    { phrase: "¿Me extrañaste? Aquí estoy.", animation: clippy4 },
  ],
  idle: [
    { phrase: "Estoy aquí, por si necesitas ayuda.", animation: clippy1 },
    { phrase: "Tengo vida propia, ¿sabes?", animation: clippy7 },
    { phrase: "No me dejes esperando...", animation: clippy5 },
    { phrase: "Puedo parecer pequeño, pero estoy atento.", animation: clippy2 },
    { phrase: "Tranquilo, yo me encargo de todo.", animation: clippy3 },
    { phrase: "¿Vas a abrir algo más o qué?", animation: clippy6 },
    { phrase: "Me aburro... haz clic en algo.", animation: clippy5 },
    { phrase: "Aquí sigo, mirando todo lo que haces.", animation: clippy4 },
    { phrase: "No tengo sueño, pero tú sí pareces cansado.", animation: clippy7 },
    { phrase: "Estoy en modo vigilancia. Todo bajo control.", animation: clippy1 },
    { phrase: "¿Sabías que puedo contar hasta infinito? Bueno, casi.", animation: clippy3 },
    { phrase: "Este escritorio está muy ordenado... por ahora.", animation: clippy2 },
  ],
  click: [
    { phrase: "¡Ey! Dolió... bueno, no.", animation: clippyNo },
    { phrase: "¿Otra vez me tocas?", animation: clippyNo },
    { phrase: "¡Ya está, ya está! Aquí estoy.", animation: clippy1 },
    { phrase: "No interrumpas, estoy pensando.", animation: clippyNo },
    { phrase: "¡Eso estuvo bien! Otro clic.", animation: clippy3 },
    { phrase: "¿Puedo ayudarte en algo o solo molestas?", animation: clippy6 },
  ],
  windowOpen: [
    { phrase: "¡Ey! Esa ventana se ve interesante.", animation: clippy2 },
    { phrase: "¡Uy, algo nuevo! Déjame ver.", animation: clippy4 },
    { phrase: "¿Eso es importante? Porque yo también quiero saber.", animation: clippy5 },
    { phrase: "Ventana abierta. Misión cumplida.", animation: clippy1 },
    { phrase: "¿Necesitas ayuda ahí o lo tienes bajo control?", animation: clippy3 },
    { phrase: "Ah, conozco ese programa. Bueno, no, pero me hago.", animation: clippy7 },
    { phrase: "¿Otra ventana más? Ya somos dos.", animation: clippy6 },
    { phrase: "Me encanta cuando abres cosas nuevas. Es emocionante.", animation: clippy4 },
  ],
  curious: [
    { phrase: "¿Qué estás haciendo? Se ve divertido.", animation: clippy2 },
    { phrase: "¿Buscas algo en especial?Yo puedo ayudarte.", animation: clippy1 },
    { phrase: "¿Explorando? Me gusta ese espíritu.", animation: clippy3 },
    { phrase: "¡Oh! ¿Eso es nuevo? Cuéntame más.", animation: clippy4 },
    { phrase: "Parece que sabes lo que haces... o no.", animation: clippy5 },
    { phrase: "Tenías razón, esto es interesante.", animation: clippy7 },
  ],
  encouragement: [
    { phrase: "¡Lo estás haciendo genial! Sigue así.", animation: clippy3 },
    { phrase: "No te rindas, tú puedes con todo.", animation: clippy2 },
    { phrase: "¡Eso! Así se hace.", animation: clippy1 },
    { phrase: "Cada clic cuenta. Vas muy bien.", animation: clippy4 },
    { phrase: "Si algo no funciona, respira y vuelve a intentarlo.", animation: clippy5 },
  ],
  interruption: [
    { phrase: "¡Oye! No me interrumpas cuando estoy hablando.", animation: clippyNo },
    { phrase: "¡Ya pues! Déjame terminar.", animation: clippyNo },
    { phrase: "¿Ves? Por eso no hablo más.", animation: clippyNo },
  ],
};

export const clippySuggest = [
  'Haz clic en Enviar cuando termines el correo.',
  'Gracias por tu interés.',
  'Reproduzcamos mi canción favorita.',
  'Haz clic en el ícono de arriba para cambiar tu nombre.',
  'El servidor está caído, lo subiré pronto.',
  'Nadie está en línea, mejor llamemos a mi BOT.',
];

export function getRandomSpanish(category) {
  const pool = clippySpanish[category] || clippySpanish.idle;
  return pool[Math.floor(Math.random() * pool.length)];
}
