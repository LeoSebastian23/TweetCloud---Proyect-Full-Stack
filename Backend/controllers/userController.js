import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Crear un nuevo usuario
export const crearUsuario = async (req, res) => {
  const { name, email, password, imageProfile } = req.body; // Cambio a los campos solicitados

  try {
    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const contraseñaEncriptada = await bcrypt.hash(password, salt); // Cambiar 'contraseña' por 'password'

    const nuevoUsuario = new User({
      name,
      email,
      password: contraseñaEncriptada,
      profileImage: imageProfile || 'default-profile.png', // Cambio de 'profileImage'
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al crear el usuario' });
  }
};

// Autenticación (login) de un usuario
export const loginUsuario = async (req, res) => {
  const { email, password } = req.body; // Cambio a 'password'

  try {
    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const esValido = await bcrypt.compare(password, usuario.password); // Cambiar 'contraseña' por 'password'

    if (!esValido) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    res.status(200).json({ mensaje: 'Autenticación exitosa', usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al iniciar sesión' });
  }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find({}, '-password'); // Excluir la contraseña por seguridad
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los usuarios' });
  }
};

// Actualizar un usuario por ID
export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { name, email, imageProfile } = req.body; // Cambio a los campos solicitados

  try {
    const usuarioActualizado = await User.findByIdAndUpdate(
      id,
      { name, email, imageProfile }, // Cambio de 'nombre' por 'name' y 'imagenPerfil' por 'imageProfile'
      { new: true, runValidators: true } // Retorna el documento actualizado y aplica validaciones
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ mensaje: 'Usuario actualizado', usuario: usuarioActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al actualizar el usuario' });
  }
};

// Eliminar un usuario por ID
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioEliminado = await User.findByIdAndDelete(id);

    if (!usuarioEliminado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ mensaje: 'Usuario eliminado', usuario: usuarioEliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al eliminar el usuario' });
  }
};

