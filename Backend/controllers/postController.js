import Post from '../models/Post.js';
import User from '../models/User.js';


// Crear una nueva publicación
export const crearPublicacion = async (req, res) => {
  try {
    const { title, body, autor } = req.body;

    // Verificar que el campo 'autor' esté presente
    if (!autor) {
      return res.status(400).json({ message: 'El campo "autor" es obligatorio.' });
    }

    // Verificar que el usuario existe
    const user = await User.findById(autor);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Crear la publicación
    const newPost = new Post({
      title,
      body,
      autor,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error); // Esto muestra el error en la consola del servidor
    res.status(500).json({ message: 'Error al crear la publicación', error: error.message });
  }
};

// Obtener todas las publicaciones
export const obtenerPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Post.find().populate('autor', 'nombre imagenPerfil');
    res.status(200).json(publicaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener las publicaciones' });
  }
};

// Obtener una publicación por ID
export const obtenerPublicacionPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate('autor', 'nombre imagenPerfil');
    if (!post) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener la publicación' });
  }
};

// Editar una publicación
export const editarPublicacion = async (req, res) => {
  const { id } = req.params;
  const { titulo, cuerpo } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { titulo, cuerpo },
      { new: true }
    );
    
    if (!post) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }

    res.status(200).json({ mensaje: 'Publicación actualizada', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al actualizar la publicación' });
  }
};

// Eliminar una publicación
export const eliminarPublicacion = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }

    res.status(200).json({ mensaje: 'Publicación eliminada', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al eliminar la publicación' });
  }
};
