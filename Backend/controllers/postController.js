import Post from '../models/Post.js';
import User from '../models/User.js';


// Crear una nueva publicación
export const crearPublicacion = async (req, res) => {
  const { titulo, cuerpo } = req.body;
  const usuarioId = req.userId; // Este valor debe ser parte de un sistema de autenticación

  try {
    const nuevoPost = new Post({
      titulo,
      cuerpo,
      autor: usuarioId, // Relacionar el post con el usuario autenticado
    });

    await nuevoPost.save();
    res.status(201).json({ mensaje: 'Publicación creada exitosamente', post: nuevoPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al crear la publicación' });
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
