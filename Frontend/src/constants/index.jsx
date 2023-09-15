import { Work, home, myworks, profile } from "../assets";

export const navlinks = [
  {
    name: "inicio",
    imgUrl: home,
    link: "/",
  },
  {
    name: "empleos",
    imgUrl: Work,
    link: "/empleos",
  },
  {
    name: "postulaciones",
    imgUrl: myworks,
    link: "/postulaciones",
  },

  {
    name: "perfil",
    imgUrl: profile,
    link: "/perfil",
  },
];

export const StudentsGuia = [
  {
    Id: 1,
    AriaLabel: "¿Como Inscribirte?",
    Title: "¿Como Inscribirte?",
    Description:
      "El primer paso es tener una cuenta de email de la UTN-FRRO, si aun no la tenés retirá el formulario en la Secretaría de Asuntos Universitarios.",
  },
  {
    Id: 2,
    AriaLabel: "¿Cómo acceder al sistema de Bolsa de Trabajo?",
    Title: "¿Cómo acceder al sistema de Bolsa de Trabajo?",
    Description:
      " Debes ingresar al sistema mediante el formulario que se encuentra más arriba, en esta misma pagina, introduciendo tu usuario y tu password. Recordá que primero debiste haber cambiado la clave por defecto de la cuenta de correo @frro.utn.edu.ar.",
  },
  {
    Id: 3,
    AriaLabel:
      "¿Cómo subir tu CV, y actualizar información personal y académica?",
    Title: "¿Cómo subir tu CV, y actualizar información personal y académica?",
    Description:
      "La primera vez que accedes al sistema tendrás que cargar tus datos desde ' Actualizar mis datos' . El CV (en formato pdf, doc o archivo comprimido), lo subirás desde la pestaña 'Otros Datos'. IMPORTANTE: Sí no tenes subido el CV al momento de postularte, tu postulación no será tenida en cuenta por el sistema.",
  },
  {
    Id: 4,
    AriaLabel: "¿Cómo postularte a las ofertas laborales?",
    Title: "¿Cómo postularte a las ofertas laborales?",
    Description:
      "Desde 'Búsquedas' tendrás un listado con todas las ofertas laborales publicadas, y para ver que solicita cada una de ellas tenes que hacer clic donde está la lupa (sobre el margen derecho). Si te interesa esa busqueda haces click en 'Postularme a esta búsqueda'. Repetimos: Es imprescindible haber cargado tu curríulum en el sistema previo a postularte para las búsquedas. Una vez echo esto hace clic donde dice volver, y podes acceder a alguna otra búsqueda o salir del sistema. En la fila correspondiente a la búsqueda a la cual te postulaste deberá aparecer la fecha de postulación.",
  },

  {
    Id: 5,
    AriaLabel: "¿Cada cuanto tiempo se publican búsquedas laborales?",
    Title: "¿Cada cuanto tiempo se publican búsquedas laborales?",
    Description:
      "A medida que las empresas soliciten personal, la SAU publicará las búsquedas en el sistema una vez verificada la documentación de la misma.",
  },
];

export const CompaniesGuia = [
  {
    Id: 1,
    AriaLabel: "Inscripcion",
    Title: "Inscripcion",
    Description:
      "La EMPRESA debe estar inscripta en el REGISTRO PÚBLICO DE COMERCIO, tener PERSONERÍA JURÍDICA.",
  },
  {
    Id: 2,
    AriaLabel: "Empresas Unipersonales",
    Title: "Empresas Unipersonales",
    Description:
      "Las empresas UNIPERSONALES no pueden firmar CONVENIO de pasantía.",
  },
  {
    Id: 3,
    AriaLabel: " Formulario de Solicitud de Perfil",
    Title: " Formulario de solicitud de perfil",
    Description:
      "Es requerido completar el formulario para poder tener una cuenta como Empresa. https://forms.gle/vSX7LbBG8ibMddFbA",
  },
  {
    Id: 4,
    AriaLabel: "Relacion de dependencia",
    Title: "Relacion de dependencia",
    Description:
      "Para Bolsa de Trabajo (contratación bajo relación de dependencia). Completar el formulario de Solicitud de Perfil. Actualmente no tiene costo para la Empresa.",
  },

  {
    Id: 5,
    AriaLabel: "Pasantias",
    Title: "Pasantias",
    Description:
      " Contratación de pasantes, regida por la Ley de Pasantías 26427. Para contratar Pasantes, es necesario la firma de un Convenio Marco entre la Empresa y la Universidad,",
  },
  {
    Id: 6,
    AriaLabel: "Documentacion para convenio Sociedades Inscriptas",
    Title: "Documentacion para convenio Sociedades Inscriptas",
    Description:
      " Para Sociedades Inscriptas: 1. Copia del Contrato Social. 2. El firmante en representación de la Empresa se encuentre autorizado a obligar a la sociedad. 3. En el caso que el poder general se otorgue a un tercero (Ej. Jefe de RRHH) deberá acompañar copia certificada del mismo, firmado ante el juez o Banco. 4. Constancia de inscripción a la AFIP. ",
  },
  {
    Id: 7,
    AriaLabel: "Documentacion para convenio Sociedades de Hecho",
    Title: "Documentacion para convenio Sociedades de Hecho",
    Description:
      "1. Acreditar su situación frente al AFIP  2. Si quien firma no es el socio sino un mandatario deberá acreditar su poder como en el inciso 3 del caso anterior. Para Instituciones Nacionales /Provinciales/ Municipales 1. En caso de que el firmante  en representación de la institución  sea el director adjuntar copia del decreto donde surge el poder. 2. En el caso que el poder general se otorgue a un tercero (Ej. Abogado) deberá acompañar copia certificada del mismo.",
  },
  {
    Id: 8,
    AriaLabel: "Documentacion por cada pasante",
    Title: "Documentacion por cada pasante",
    Description:
      " La empresa debe enviar copia del Convenio colectivo de Trabajo. En caso de no poseerlo, la norma que los rige en cuanto a Salario, ya que el premio estímulo del pasante se basa en el Convenio Colectivo o el Salario Mínimo Vital y Móvil. Hacer nota aclarando cual es el monto. Conforme la Resolución 1225/2009 de la Superintendencia de Servicios de Salud se resuelve que las empresas deberán incluir a los pasantes en la misma obra social que tienen sus empleados. En consecuencia debe presentar el Formulario 931 de la AFIP acreditando la inclusión del pasante a la obra social. Copia del alta de la ART. Copia de la Cobertura Médico Asistencial. Datos del Tutor para poder contactarlo El pasante debe presentar Certificado de alumno regular, copia del DNI y completar la notificación de pasantía Copia del formulario 931 de AFIP a fin de comprobar cantidad de empleados en relación de dependencia.",
  },
];

export const jobsTest = [
  {
    title: "Desarrollador .NET JR",
    company: "Accenture",
    description:
      "Desarrollador .net con mas de 5 anios de experiencia sql que sepa crear un cohete y hackear la nasa, que cobre barato y hable 10 idiomas.",
  },
  {
    title: "Project Manager JR",
    company: "Globant",
    description:
      "Desarrollador .net con mas de 5 anios de experiencia sql que sepa crear un cohete y hackear la nasa, que cobre barato y hable 10 idiomas.",
  },
  {
    title: "Desarrollador React Ssr",
    company: "Mercado Libre",
    description:
      "Desarrollador .net con mas de 5 anios de experiencia sql que sepa crear un cohete y hackear la nasa, que cobre barato y hable 10 idiomas.",
  },

  {
    title: "Desarrollador .NET SR",
    company: "Accenture",
    description:
      "Desarrollador .net con mas de 5 anios de experiencia sql que sepa crear un cohete y hackear la nasa, que cobre barato y hable 10 idiomas.",
  },
  {
    title: "Desarrollador .NET JR",
    company: "Accenture",
    description:
      "Desarrollador .net con mas de 5 anios de experiencia sql que sepa crear un cohete y hackear la nasa, que cobre barato y hable 10 idiomas.",
  },
  {
    title: "Project Manager JR",
    company: "Globant",
    description:
      "Desarrollador .net con mas de 5 anios de experiencia sql que sepa crear un cohete y hackear la nasa, que cobre barato y hable 10 idiomas.",
  },
  {
    title: "Desarrollador React Ssr",
    company: "Mercado Libre",
    description:
      "Desarrollador .net con mas de 5 anios de experiencia sql que sepa crear un cohete y hackear la nasa, que cobre barato y hable 10 idiomas.",
  },

  {
    title: "Desarrollador .NET SR",
    company: "Accenture",
    description:
      "Desarrollador .net con mas de 5 anios de experiencia sql que sepa crear un cohete y hackear la nasa, que cobre barato y hable 10 idiomas.",
  },
];
