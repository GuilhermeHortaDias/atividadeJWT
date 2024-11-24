import { useState } from 'react';
import api from '../../../api/api';
import './index.css';
import { useNavigate, Link } from 'react-router-dom';

function CreateProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null); // Estado para a imagem
  const [selectedNumbers, setSelectedNumbers] = useState([]); // Estado para os números selecionados
  const navigate = useNavigate();

  const handleBoxClick = (number) => {
    setSelectedNumbers((prevSelected) => {
      if (prevSelected.includes(number)) {
        return prevSelected.filter((item) => item !== number); // Remove o número se ele já estiver selecionado
      } else {
        return [...prevSelected, number]; // Adiciona o número se ele não estiver selecionado
      }
    });
  };

  const AddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Cria um objeto FormData
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
    if (image) {
      formData.append('image', image); // Adiciona a imagem ao FormData
    }
    formData.append('selectedNumbers', JSON.stringify(selectedNumbers)); // Adiciona os números selecionados ao FormData

    try {
      await api.post('/produto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Define o tipo de conteúdo
        },
      });
      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setImage(null); // Limpa a imagem após o envio
      setSelectedNumbers([]); // Limpa os números selecionados
      alert("Produto adicionado com sucesso");
      navigate('/');
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  return (
    <div className="container">
      <div className="modal">
        <div className="modal__header">
          <span className="modal__title">Novo Produto</span>
          <Link className="Link button--icon" to="/">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </Link>
        </div>
        <div className="modal__body">
          <form onSubmit={AddProduct}>
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

            <div className="input">
              <label className="input__label">Selecione os números</label>
              <div className="number-boxes">
                {[...Array(14).keys()].map((i) => {
                  const number = i + 33; // Cria os números de 33 a 46
                  return (
                    <div
                      key={number}
                      className={`number-box ${selectedNumbers.includes(number) ? 'selected' : ''}`}
                      onClick={() => handleBoxClick(number)}
                    >
                      {number}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="input">
              <label className="input__label">Imagem do Produto</label>
              <input
                className="input__field"
                type="file"
                accept="image/jpeg, image/png, image/gif, image/webp"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="modal__footer">
              <button className="button button--primary" type="submit">Adicionar Produto</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
