import bcrypt from 'bcryptjs';

const data = {
  user: [
    
    {
      username: 'pvaldivia',
      email: 'pvaldivia@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      username: 'rodrigo',
      email: 'rodrigo@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
      
    
    },      
    {
      username: 'juanito',
      email: 'juanito@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
      
    
    }, 

  ],
  products: [
    {
      name: 'Tarta mousse de Chocolate',
      category: 'Tartas',
      image: '/images/mousse-chocolate.jpg',
      price: 6500,
      countInStock: 10,
      description: 'Esta tarta de mousse de chocolate es una tarta suave, que se deshace en la boca, pero en su interior tiene una mousse contundente lo que hace que sea un pastel que rinda para bastantes porciones.',
    },
    {
      name: 'Cheesecake de Nutella',
      category: 'Tartas',
      image: '/images/nutella.jpg',
      price: 8990,
      countInStock: 7,
      description: 'Los amantes de las tartas de queso y de la Nutella flotarán de placer cuando prueben esta increíble cheesecake de Nutella sin horno.',
    },
    {
      name: 'Pastel de Selva Negra',
      category: 'Pasteles',
      image: '/images/selva-negra.jpeg',
      price: 7990,
      countInStock: 1,
      description: 'La tarta o torta Selva Negra está compuesta por varias capas de bizcochuelo de chocolate embebido en kirsch e intercaladas con nata y cerezas.',
    },
    {
      name: 'Pastel de Zanahoria',
      category: 'Pasteles',
      image: '/images/zanahoria.jpg',
      price: 8990,
      countInStock: 3,
      description: 'El pastel de zanahoria, tarta de zanahoria o torta de zanahoria es un pastel dulce con zanahoria machacada mezclada en la masa.',
    },
    {
      name: 'Pastel de trufa',
      category: 'Pasteles',
      image: '/images/trufa.jpg',
      price: 12990,
      countInStock: 10,
      description: 'Exquisito pastel de trufas con frambuesas encima',
    },
    {
      name: 'Torta Celestial',
      category: 'Pasteles',
      image: '/images/torta-celestial.jpg',
      price: 10990,
      countInStock: 12,
      description: 'Sabías que ésta Torta es típica en el sur de Chile, específicamente Valdivia? Está preparada con unas capas de Bizcochos y Milhojas con Manjar, Crema Pastelera, Mermelada de Frambuesa, Merengue',
    },
    {
      name: 'Tiramisú',
      category: 'Postres',
      image: '/images/tiramisu.jpg',
      price: 15990,
      countInStock: 0,
      description: 'Es otro postre frío de origen italiano y está hecho a base de café, licor y crema. '
    },
    {
      name: 'Suspiro Limeño',
      category: 'Postres',
      image: '/images/trufa.jpg',
      price: 13990,
      countInStock: 2,
      description: 'Según su dulce historia, este postre fue creado por Amparo Ayarza, esposa del poeta José Gálvez Barrenechea.'
    },
  ],
};
export default data;
