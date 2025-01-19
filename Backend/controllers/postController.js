import { verificarToken } from '../middleware/jwt.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

// Crear una nueva publicación
export async function crearPublicacion(req, res) {
  try {
    const { body } = req.body;
    const userId = req.user.userId;

    if (!body) {
      return res.status(400).json({ message: "Post content is required" });
    }

    // Crear la publicación
    const nuevaPublicacion = await Post.create({
      body,
      autor: userId,
    });

    // Popular el autor para devolver su información completa
    const publicacionConAutor = await Post.findById(nuevaPublicacion._id).populate(
      "autor",
      "name imageProfile" // Solo selecciona los campos necesarios del autor
    );

    return res.status(201).json(publicacionConAutor);
  } catch (error) {
    console.error("Error al crear la publicación:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

// Obtener todas las publicaciones
export const obtenerPublicaciones = async (req, res) => {
  try {
    const posts = await Post.find().populate('autor', 'name email imageProfile');
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener las publicaciones.' });
  }
};

// Obtener una publicación por ID
export const obtenerPublicacionPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate('autor', 'nombre imagenPerfil');
    if (!post) {
      return res.status(404).json({ error: 'Publicación no encontrada.' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener la publicación.' });
  }
};

// Editar una publicación
export const editarPublicacion = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, body },
      { new: true, runValidators: true } // `runValidators` asegura que se validen los campos
    );

    if (!post) {
      return res.status(404).json({ error: 'Publicación no encontrada.' });
    }

    res.status(200).json({ message: 'Publicación actualizada exitosamente.', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al actualizar la publicación.' });
  }
};

// Eliminar una publicación
export const eliminarPublicacion = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ error: 'Publicación no encontrada.' });
    }

    res.status(200).json({ message: 'Publicación eliminada exitosamente.', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al eliminar la publicación.' });
  }
};

export const eliminarPublicaciones = async (req, res) => {
  try {
    await Post.deleteMany(); // Elimina todos los posts
    res.status(200).json({ message: 'Todos los posts fueron eliminados exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al eliminar todos los posts.' });
  }
};
