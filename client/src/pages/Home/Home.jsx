import { useState, useEffect } from 'react';
import api from '../../api/api';
import Card from './card/index';
import Header from './header/index';
import styles from './Home.module.css';

export const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [filteredProdutos, setFilteredProdutos] = useState([]);

  // Fetch para obter produtos da API
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get('/produto');
        // Ajusta as URLs das imagens, se necessário
        const produtosComImagens = response.data.map((produto) => ({
          ...produto,
          image: produto.image ? `http://localhost:5000/${produto.image}` : '', // Garantir caminho correto
        }));
        setProdutos(produtosComImagens);
        setFilteredProdutos(produtosComImagens);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    };
    fetchProdutos();
  }, []);

  // Lógica de busca
  const handleSearch = (query) => {
    setFilteredProdutos(
      produtos.filter((produto) =>
        produto.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  // Filtro por quantidade
  const handleFilterQuantity = (quantity) => {
    setFilteredProdutos(
      produtos.filter((produto) =>
        quantity === 'all' ? true : produto.quantity === quantity
      )
    );
  };

  // Renderizando
  return (
    <>
      <Header onSearch={handleSearch} onFilterGender={handleFilterQuantity} />
      <div className={styles.container}>
        {filteredProdutos.length > 0 ? (
          <section className={styles.lista}>
            {filteredProdutos.map((produto) => (
              <Card
                key={produto.id}
                name={produto.name}
                description={produto.description}
                price={produto.price}
                quantity={produto.quantity}
                image={produto.image}
              />
            ))}
          </section>
        ) : (
          <p className={styles.loading}>Carregando produtos...</p>
        )}
      </div>
    </>
  );
};
