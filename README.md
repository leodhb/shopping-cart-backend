# SHOPPING CART BACKEND
### API criada para ser consumida por uma interface de carrinho de compras
### Deploy rodando [aqui](https://shoppingcartapi1.herokuapp.com/)

### 1. Como roda essa bagaça?

    git clone https://github.com/leodhb/shopping-cart-backend 
    cd shopping-cart-backend
    npm install
 
 Após isso, crie um arquivo .env na raiz do repositório e siga a mesma estrutura do .env.example, para adicionar suas URLs do Mongodb
 
 Para executar:
    
    npm start

 Saída esperada: 
 
        [nodemon] watching path(s): *.*
        [nodemon] watching extensions: js,mjs,json  
        [nodemon] starting `node src/index.js`      
        [API] Positivo e operante na porta 3000
        [MONGODB] Conectado ao database
        
        
 Caso esteja rodando no seu proprio banco, não esqueça de fazer a inserção dos produtos de amostra _/data/product-list.json_ (Um POST por vez, para que o Mongo gere os IDs corretamente). Recomendo fazer isso usando o Postman
 
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
   A aplicação está integrada a um pipeline do Heroku, este estava anteriormente baseado em uma instancia do CodeDeploy e uma VM do EC2, porém houveram problemas com implementação do SSL
   
  ### 5. Testes
  A aplicação usa o Jest em conjunto com o Supertest para realizar os testes de unidade da API. Você pode ver detalhadamente o que cada um faz e espera no diretório _/src/tests_
   
