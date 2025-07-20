// 1. Importar dotenv e as dependências
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; // Importe o dotenv

// 2. Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// 3. Inicializar o Express
const app = express();
// Use a porta definida no ambiente ou 3000 como padrão
const port = process.env.PORT || 3000;

// 4. Configurar Middlewares
app.use(cors());
app.use(express.json());

// 5. Conectar ao MongoDB Atlas usando a variável de ambiente
const mongoURI = process.env.MONGODB_URI;

// Verificação de segurança: Garante que a variável de ambiente existe
if (!mongoURI) {
    console.error('Erro: A variável de ambiente MONGODB_URI não está definida no arquivo .env');
    process.exit(1); // Encerra a aplicação se a conexão com o DB não puder ser estabelecida
}

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB conectado com sucesso com TypeScript!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// 6. Criar a INTERFACE do Post (aqui está o poder do TypeScript)
interface IComentario extends mongoose.Document {
    autor: string;
    texto: string;
    data: Date;
}

interface IPost extends mongoose.Document {
  id_secao: string;
  titulo: string;
  conteudoHTML: string;
  autor: string;
  data: string;
  comentarios: IComentario[];
}

// 7. Criar os Schemas do Mongoose
const comentarioSchema = new mongoose.Schema({
    autor: { type: String, required: true },
    texto: { type: String, required: true },
    data: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  id_secao: { type: String, required: true },
  titulo: { type: String, required: true },
  conteudoHTML: { type: String, required: true },
  autor: { type: String, default: 'Ely Miranda' },
  data: { type: String, default: '08/04/2025' },
  comentarios: [comentarioSchema]
});

const Post = mongoose.model<IPost>('Post', postSchema);

// 8. Criar as Rotas da API com Tipos
app.get('/api/posts', async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar postagens', error: err });
    console.log(err);
  }
});

app.post('/api/posts', async (req: Request, res: Response) => {
    try {
        const novoPost = new Post({
            id_secao: req.body.id_secao,
            titulo: req.body.titulo,
            conteudoHTML: req.body.conteudoHTML,
        });
        await novoPost.save();
        res.status(201).json(novoPost);
    } catch(err) {
        res.status(400).json({ message: "Erro ao criar postagem", error: err });
    }
});

app.post('/api/posts/:postId/comments', async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ message: 'Post não encontrado' });
        }

        const novoComentario = {
            autor: req.body.autor,
            texto: req.body.texto
        };

        post.comentarios.push(novoComentario as any);
        await post.save();

        res.status(201).json(post);
    } catch (err) {
        console.error("Erro ao adicionar comentário:", err);
        res.status(500).json({ message: 'Erro ao adicionar comentário', error: err });
    }
});

// 9. Middleware de tratamento de erros global
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("--- ERRO GLOBAL CAPTURADO ---");
  console.error(error);
  
  if (res.headersSent) {
    return next(error);
  }
  
  res.status(500).json({ 
    message: "Ocorreu um erro interno no servidor.",
    errorMessage: error.message
  });
});

// 10. Iniciar o servidor
app.listen(port, () => {
    console.log('Servidor iniciado com sucesso!');
    console.log(`Servidor TypeScript rodando em http://localhost:${port}`);
});
