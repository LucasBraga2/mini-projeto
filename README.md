# mini-projeto

Novas Funcionalidades (v1.1.1): CRUD de Filmes
Esta versão introduz um CRUD (Create, Read, Update, Delete) completo para gerenciamento de filmes, totalmente integrado ao sistema de autenticação.

Rotas Protegidas
Todas as novas rotas de filmes (/api/movies) exigem autenticação via token JWT. Nenhuma operação pode ser realizada por um usuário não autenticado.

Vínculo de Usuário
A nova model de Movie possui uma referência direta ao usuário (user). A camada de serviço garante que:

Um usuário só pode criar filmes associados à sua própria conta.

Um usuário só pode listar e ver os filmes que ele criou.

Um usuário só pode atualizar e deletar os filmes que lhe pertencem. Tentativas de acessar filmes de outros usuários resultarão em um erro 404 Not Found.

Endpoints Adicionados

POST /api/movies: Cria um novo filme.

GET /api/movies: Lista todos os filmes do usuário logado.

GET /api/movies/:id: Obtém um filme específico do usuário logado.

PUT /api/movies/:id: Atual