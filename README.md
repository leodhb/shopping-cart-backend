# SHOPPING CART BACKEND
### API criada para ser consumida por uma interface de carrinho de compras
### Deploy rodando [aqui](http://18.230.60.184:3000/)

### 1. Como roda essa bagaça?

    git clone https://github.com/leodhb/shopping-cart-backend 
    cd shopping-cart-backend
    npm i
    
 Se quiser usar uma base de dados própria no mongodb é só mudar as variáveis de ambiente no arquivo dotenv. Deixei as minhas a mostra para encurtar o processo.
 
 ### 2. Endpoints
 
  - /products
  - /cart
  
 ### 3. Verbos e ações
 #### 3.1 Produtos
  - **[GET]** /products (Listar todos os produtos)
  - **[POST]** /products (Adicionar um produto)
  - **[GET]** /products/:id (Pegar produto pelo id (ObjectID do Mongo))
  - **[PATCH]** /products/id (Atualizar produto)
  - **[DELETE]** /products/id (Excluir produto)
  
 #### 3.2 Carrinho
  - **[GET]** /cart/:id (Pegar carrinho pelo id ou cria-lo se não existir)
  - **[PUT]** /cart/:id (Adicionar produto ao carrinho)
  - **[PATCH]** /cart/:id (Incrementar ou decrementar quantidade do produto no carrinho)
  - **[GET]** /cart/:id/:item (Pegar produto qualquer no carrinho)
  - **[DELETE]** /cart/:id/:item (Deletar produto no carrinho)
  
  ### 4. CI/CD
   A aplicação usa um pipeline AWS para fazer integração e entrega contínua. O pipeline usa o AWS CodeDeploy, que espera por um commit no repoitório para dar pull em uma instância do EC2.
