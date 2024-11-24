
import { useState, useEffect } from 'react';
import api from '../../../api/api';
import './index.css';
import { useNavigate, Link, useParams } from 'react-router-dom';

function EditProduct() {
  const { id } = useParams(); 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

  
  const fetchProduct = async () => {
    try {
      const response = await api.get(`/produto/${id}`); 
      const produto = response.data;
      setName(produto.name);
      setDescription(produto.description);
      setPrice(produto.price);
      setQuantity(produto.quantity);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const editProduct = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/produto/${id}`, { name, description, price, quantity }); 
      alert("Produto atualizado com sucesso");
      navigate('/'); 
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  return (
    <div className="container">
      <div className="modal">
        <div className="modal__header">
          <span className="modal__title">Atualizar Produto</span>
          <Link className="Link button--icon" to="/">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </Link>
        </div>
        <div className="modal__body">
          <form onSubmit={editProduct}>
            <div className="input">
              <label className="input__label">Nome do Produto</label>
              <input
                className="input__field"
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength="32"
                required
              />
              <p className="input__description">O nome deve conter no máximo 32 caracteres</p>
            </div>

            <div className="input">
              <label className="input__label">Descrição</label>
              <textarea
                className="input__field input__field--textarea"
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
              <p className="input__description">Dê uma boa descrição para seu produto.</p>
            </div>

            <div className="input">
              <label className="input__label">Preço</label>
              <input
                className="input__field"
                type="number"
                placeholder="Preço"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="input">
              <label className="input__label">Quantidade</label>
              <input
                className="input__field"
                type="number"
                placeholder="Quantidade"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div className="modal__footer">
              <button className="button button--primary" type="submit">Atualizar Produto</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
