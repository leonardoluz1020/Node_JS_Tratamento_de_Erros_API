import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static listarAutorPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const autorPorId = await autores.findById(id);
      if (autorPorId !== null) {
        res.status(200).send(autorPorId);
      } else {
        res.status(404).send({ message: "Id do Autor não localizado." });
      }
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos" });
      } else {
        res.status(500).send({ message: "Erro interno de servidor" });
      }
    }
  };

  static cadastrarAutor = async (req, res) => {
    let autor = new autores(req.body);
    try {
      const novoAutor = await autor.save();
      res.status(201).send(novoAutor);
    } catch (error) {
      res.status(500).send({ message: "falha ao cadastrar Autor." });
    }
  };

  static atualizarAutor = async (req, res) => {
    const id = req.params.id;
    try {
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (error) {
      res.status(500).send({ message: "Não foi possível atualizar" });
    }
  };

  static excluirAutor = async (req, res) => {
    const id = req.params.id;
    try {
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido com sucesso" });

    } catch (error) {
      res.status(500).send({ message: "Erro ao deletar" });
    }
  };

}

export default AutorController;